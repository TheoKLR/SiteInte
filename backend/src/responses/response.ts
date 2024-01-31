export enum Code {
    OK = 200,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    CREATED = 201,
    ISE = 500
}

export class HttpResponse {
    private timeStamp: string;
    private httpStatus: string;

    constructor(private statusCode: Code, private message: string, private data?: {}) {
        this.timeStamp = new Date().toLocaleString();
        this.statusCode = statusCode;
        this.httpStatus = this.getStatus();
        this.message = message;
        this.data = data;
    }

    private getStatus(): string {
        switch (this.statusCode) {
            case Code.OK:
              return 'OK';
            case Code.NOT_FOUND:
              return 'NOT_FOUND';
            case Code.BAD_REQUEST:
              return 'BAD_REQUEST';
            case Code.CREATED:
                return 'CREATED';
            case Code.ISE:
                return 'INTERNAL_SERVER_ERROR';
          }    
    }
}