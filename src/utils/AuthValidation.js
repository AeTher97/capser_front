export function validateEmail(email) {
    let errors = null;
    if (!email) {
        errors = "Required Email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors = "Invalid email address";
    }
    return errors;
}

export function validatePassword(password) {
    let errors = null;
    if (!password) {
        errors = "Required Password";
    } else if (password.length < 6) {
        errors = "Password must be at least 6 characters";
    }
    return errors;
}