export const updateObject = (oldObject, newObject) => {
    return {
        ...oldObject,
        ...newObject
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    // REM - email validation pattern
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
};

export const checkValidityAndError = (value, orderElement) => {
    let checked = {
        valid: true,
        validationError: ''
    };

    if (!orderElement.validation) {
        return checked; // FIX - 2) to prevent "TypeError: Cannot read property 'required' of undefined" in checkValidityAndError() when toggle the delivery method select option
    }

    if (orderElement.validation.required) {
        if (value.trim() !== '') {
            checked.valid = true;
        } else {
            checked.valid = false;
            checked.validationError = orderElement.errorType.empty;
        }
    }

    if (orderElement.validation.minLength) {
        checked.valid = value.length >= orderElement.validation.minLength && checked.valid;

        if (value.length < orderElement.validation.minLength) {
            checked.validationError = orderElement.errorType.minLength;
        }
    }

    if (orderElement.validation.maxLength) {
        checked.valid = value.length <= orderElement.validation.maxLength && checked.valid;

        if (value.length > orderElement.validation.maxLength) {
            checked.validationError = orderElement.errorType.maxLength;
        }
    }

    // console.log(orderElement);
    return checked;
};