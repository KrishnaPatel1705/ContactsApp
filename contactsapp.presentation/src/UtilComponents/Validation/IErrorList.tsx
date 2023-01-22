import { IError } from './IError'

export class IErrorList {
    Errors: Array<IError>

    constructor() {
        this.Errors = new Array<IError>();
    }
}
