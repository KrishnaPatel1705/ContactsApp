import * as React from "react";
import { checkToDisplayError, getErrorDescription } from "../../UtilComponents/Validation/Validator";
import { IError } from "../../UtilComponents/Validation/IError";

interface IValidationErrorNotificationProps {
    Errors: Array<IError>,
    SourceField: string,
    HasError: boolean
}

export const ValidationErrorNotification = (Props: IValidationErrorNotificationProps) =>
{
    return (
        <>
            { Props.HasError === true && <span className="error" title={getErrorDescription(Props.Errors, Props.SourceField)}>!</span>}
        </>
    )
}