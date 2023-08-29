import { ValidationPipe } from '@nestjs/common';
import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';

export const validationPipe = new ValidationPipe({
  exceptionFactory: (error: object[]) =>
    ErrorResponse.validateRequestBody(error),
});
