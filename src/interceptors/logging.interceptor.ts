import {ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        console.log(`From class: ${context.getClass().name}`);
        console.log(`Call method: ${context.getHandler().name}`);
        return call$.pipe(
            tap(() => console.log(`---`)),
        );
    }
}
