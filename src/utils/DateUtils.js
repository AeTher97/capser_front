export function getFormattedDate(rawDate) {
    const date = new Date(rawDate);
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    return `${day}-${month}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}