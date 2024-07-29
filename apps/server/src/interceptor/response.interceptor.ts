import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseData } from './responseData';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const { code, msg, data, token } = response;

        if (code === 200) {
          return ResponseData.ok<T>(data, msg, token);
        } else {
          return ResponseData.fail(msg, code);
        }
      }),
    );
  }
}
