export function validateUsername(email) {
    let errors = null;
    if (!email) {
        errors = "Required Username";
    } else if (!/.{4,}/.test(email)) {
        errors = "Username must be at least 4 characters";
    }
    return errors;
}

export function validatePassword(password) {
    let errors = null;
    if (!password) {
        errors = "Required Password";
    } else if (password.length < 4) {
        errors = "Password must be at least 4 characters";
    }
    return errors;
}
