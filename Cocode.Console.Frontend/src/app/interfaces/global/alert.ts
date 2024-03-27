export interface IAlert {
    type: 'primary'| 'accent'| 'warn'| 'basic'| 'info'| 'success'| 'warning'| 'error';
    message: string;
}