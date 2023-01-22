import * as React from "react";
import NumberFormat from 'react-number-format'

interface NumericInputProps extends React.HTMLAttributes<HTMLElement> {
    Id: string,
    OnChange?: (e: any) => void,
    ClassName?: string,
    Value?: string,
    PlaceholderText?: string,
}

export const NumericInput = (Props: NumericInputProps) => {
    return (
        <NumberFormat id={Props.Id} name={Props.Id}
            className={Props.ClassName} onChange={Props.OnChange} placeholder={Props.PlaceholderText}
            inputMode="numeric" value={Props.Value}/>
    );
}

export default NumericInput;