export enum ErrorCode {
  PROMOTION_NOT_FOUND = 'PROMOTION_NOT_FOUND',
  PROMOTION_EXPIRED = 'PROMOTION_EXPIRED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export class ApiResponseDto<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  errorCode?: ErrorCode;
  traceId: string;

  constructor(statusCode: number, message: string, data?: T, errorCode?: ErrorCode) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.errorCode = errorCode;
    this.traceId = this.generateTraceId();
  }

  private generateTraceId(): string {
    return `trace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}