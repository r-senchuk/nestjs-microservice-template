import { Catch, ArgumentsHost } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';

@Catch()
export class KafkaExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): Observable<Error> {
    return super.catch(exception, host);
  }
}
