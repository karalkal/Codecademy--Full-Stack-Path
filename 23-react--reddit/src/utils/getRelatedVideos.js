export default function getRelatedVideos(obj) {
    // most videos are hosted on reddit, but some on youtube,
    // hence the former need to be rendered as <video>, the latter as <iframe> 
    // the function will construct object accordingly, so that it could be utilized in <Card />
    // if neither, function will return null
    let video = null
    if (!obj.data.secure_media) {     // if no video in json return null
        return null
    }
    else {      // if media exists
        // if reddit video
        if (obj.data.secure_media.reddit_video
            && obj.data.secure_media.reddit_video.fallback_url) {
            const videoSrc = obj.data.secure_media.reddit_video.fallback_url
            video = { videoProvider: "reddit", videoSrc }
        }
        // if from youtube
        else if (obj.data.secure_media.oembed.html) {
            /*
            it will look sometthing like:
            &lt;iframe width="356" height="200" src="https://www.youtube.com/embed/9RFMQEEmU8g?feature=oembed&amp;enablejsapi=1" frameborder="0" .....
            need to extract just the src bit
            */
            const htmlOfJson = obj.data.secure_media.oembed.html
            const indexOfSrcTag = htmlOfJson.indexOf('src="')
            const indexOfTrailingSemiColon = htmlOfJson.indexOf('"', indexOfSrcTag + 40)

            const videoSrc = htmlOfJson.slice(indexOfSrcTag + 5, indexOfTrailingSemiColon)

            if (videoSrc.startsWith('https://www.youtube.com')) {
                video = { videoProvider: "youtube", videoSrc }
            }
        }
        else {
            return null
        }
    }

    return video
}