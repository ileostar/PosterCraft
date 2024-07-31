import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';

export const projectConfig: SwaggerUiOptions = {
  Project: 'PosterCraft Server',
  port: process.env.PORT || 3001,
  StartLog: `[PosterCraft] Nest Service Started Successfully🎉🎉🎉\n[PosterCraft]  Server URL: \x1b[34mhttp://localhost:3001\x1b[0m \x1b[32m\n[PosterCraft] Swagger URL:\x1b[0m \x1b[35mhttp://localhost:3001/swagger\x1b[0m`,
  swaggerConfig: {
    customSiteTitle: 'PosterCraft API接口文档',
    customfavIcon:
      'https://img.leostar.top/study/3b40f927051d609da796cbfe36b36b24.png',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  },
};
