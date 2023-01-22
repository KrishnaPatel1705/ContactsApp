import { validate } from 'class-validator';
import { IError } from './IError';
import { IErrorList } from './IErrorList';

export async function ValidateModelWithErrorList<T extends IErrorList>(object: T) {
    let isValidForm = true;
    object.Errors.splice(0, object.Errors.length);
    await validate(object).then(errors => {
        let annotations = ["isNotEmpty", "minLength","maxLength"];
        errors.map(function (x) {
           return annotations.forEach(annotation => {
                if (x.constraints![annotation]) {
                    object.Errors.push({ name: x.property, description: x.constraints![annotation] });
                }
            })
        })
    });
    if (object.Errors.length > 0) {
        isValidForm = false;
    }
    return isValidForm
}

export function checkToDisplayError(object: Array<IError>, sourceField: string) {
    let found = false;
    var foundProperty = object?.filter(i => i.name === sourceField)[0];
    if (foundProperty) {
        found = true;
    }
    return found;
}

export function getErrorDescription(object: Array<IError>, sourceField: string) {
    var errorDescription = object?.filter(m => m.name === sourceField)[0].description;
    return errorDescription
}