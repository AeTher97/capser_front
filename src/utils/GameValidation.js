export function validatePoints(points) {
    let errors = null;
    if (parseInt(points) < 0) {
        errors = "Points cannot be less than zero";
    } else if (!/^\d+$/.test(points)) {
        errors = "This field can only contain numbers";

    }
    return errors;
}

export function validateSinks(points) {
    let errors = null;
    if (parseInt(points) < 0) {
        errors = "Sinks cannot be less than zero";
    } else if (!/^\d+$/.test(points)) {
        errors = "This field can only contain numbers";

    }
    return errors;
}

