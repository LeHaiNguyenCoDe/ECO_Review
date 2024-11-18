export default class ResponseMdl<T> {
  data?: T;
  status: number;
  message: string;
  timestamp?: number;

  constructor(status: number, message: string, data?: T, timestamp?: number) {
    this.data = data;
    this.status = status;
    this.message = message;
    this.timestamp = timestamp;
  }
}
