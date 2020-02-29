export function validateUsername(email) {
    let errors = null;
    if (!email) {
        errors = "Required Username";
    } else if (email.length < 3) {
        errors = "Username must be at least 3 characters";
    }
    return errors;
}

export function validatePassword(password) {
    let errors = null;
    if (!password) {
        errors = "Required Password";
    } else if (password.length < 3) {
        errors = "Password must be at least 3 characters";
    }
    return errors;
}
