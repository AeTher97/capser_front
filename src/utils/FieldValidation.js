import React, {useEffect} from "react";

function useFieldValidation(initialValue, validate) {
    const [value, setValue] = React.useState(initialValue);
    const [errors, setErrors] = React.useState(null);

    useEffect(() => {
        if (value !== initialValue) {
            const validationErrors = validate(value);
            setErrors(validationErrors);
        }
    }, [value, validate, initialValue]);

    function handleChange(event) {
        setValue(event.target.value);
    }


    function handleBlur() {
        const validationErrors = validate(value);
        setErrors(validationErrors);
    }

    function runValidation() {
        const validationErrors = validate(value);
        setErrors(validationErrors);
        return validationErrors
    }

    function clearValue() {
        setValue('');
    }

    return {
        value,
        handleChange,
        errors,
        handleBlur,
        clearValue,
        validate: runValidation
    }

}

export default useFieldValidation;
