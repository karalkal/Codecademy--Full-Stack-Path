export default function formatUTCToDateAndTime(utcObject) {
    // The Date constructor from Javascript accepts the number of milliseconds as timestamp, not unix time (number of seconds).
    // So, to adjust that, is just multiply the unix time by 1000.

    const unixTime = utcObject.created_utc * 1000
    let date = new Date(unixTime);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedDate = date.toLocaleDateString()
    let formattedTime = hours + 'h\xa0' + minutes.substr(-2) + 'm\xa0' + seconds.substr(-2) + "s";
    return ({ formattedTime, formattedDate })
}