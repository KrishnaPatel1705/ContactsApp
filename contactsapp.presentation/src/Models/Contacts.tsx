import { IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { IErrorList } from '../UtilComponents/Validation/IErrorList';

export default class Contact extends IErrorList {
    contactID: number = 0;

    @IsNotEmpty({message: 'First name is required'})
    firstName: string = "";

    lastName: string = "";

    @MinLength(10, {
        message: 'Number is too short',
      })
      @MaxLength(10, {
        message: 'Number is too long',
      })
    phoneNumber: string = "";
} 