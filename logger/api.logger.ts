import bunyan from 'bunyan';

const logger = bunyan.createLogger({name: 'test_task_app'});

export class Logger {

     info(message: string, data: any, correlationId: string){

        logger.info({
            message,
            data,
            correlationId,
        })
     }

     error(message:string){
         logger.error(message);
     }
}