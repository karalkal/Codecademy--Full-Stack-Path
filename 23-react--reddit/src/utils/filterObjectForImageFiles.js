export default function filterObjectForImageFiles(objToSearch) {
    // if thumbnail is "self" (no idea what this is) or we have video (video has thumbnail attached too)
    // check for extension too as articles with no img also have "url_overridden_by_dest"
    // check for video  as well
    if (objToSearch.img_thumbnail && !objToSearch.media
        && (objToSearch.img_thumbnail.slice(-4) === ".png"
            || objToSearch.img_thumbnail.slice(-4) === ".jpg"
            || objToSearch.img_thumbnail.slice(-4) === ".gif")) {
        return (objToSearch.img_thumbnail)
    } //else
    return null
}