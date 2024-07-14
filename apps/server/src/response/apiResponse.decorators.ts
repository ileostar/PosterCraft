import type { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

const baseTypeNames = ['String', 'Number', 'Boolean'];

/**
 * @description: 生成返回结果装饰器
 */
export function APIResponse<TModel extends Type<any>>(
  type?: TModel | TModel[],
  isPage?: boolean,
) {
  let prop = null;
  if (Array.isArray(type)) {
    if (isPage) {
      prop = {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: { $ref: getSchemaPath(type[0]) },
          },
          itemCount: { type: 'number', default: 0 },
          totalItems: { type: 'number', default: 0 },
          totalPages: { type: 'number', default: 0 },
          currentPage: { type: 'number', default: 0 },
          itemsPerPage: { type: 'number', default: 0 },
        },
      };
    } else {
      prop = {
        type: 'array',
        items: { $ref: getSchemaPath(type[0]) },
      };
    }
  } else if (type) {
    if (type && baseTypeNames.includes(type.name))
      prop = { type: type.name.toLocaleLowerCase() };
    else prop = { $ref: getSchemaPath(type) };
  } else {
    prop = { type: 'null', default: null };
  }

  const resProps = {
    type: 'object',
    properties: {
      code: { type: 'number', default: 200 },
      msg: { type: 'string', default: 'ok' },
      data: prop,
    },
  };

  return applyDecorators(
    ApiExtraModels(type ? (Array.isArray(type) ? type[0] : type) : String),
    ApiResponse({
      schema: {
        allOf: [resProps],
      },
    }),
  );
}
