export function isValidTime(timeStr) {
    // Use a regular expression to match the time format "hh:mm"
    const regex = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
    return regex.test(timeStr);
}
