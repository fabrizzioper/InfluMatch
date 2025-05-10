import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  info(message: any, ...optionalParams: any[]): void {
    console.info('[INFO]', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): void {
    console.warn('[WARN]', message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    console.error('[ERROR]', message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): void {
    console.debug('[DEBUG]', message, ...optionalParams);
  }
}
