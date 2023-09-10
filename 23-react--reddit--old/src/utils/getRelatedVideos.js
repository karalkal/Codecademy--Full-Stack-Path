export default function getRelatedVideos(obj) {
    // most videos are hosted on reddit, but some on youtube or as gifv,
    // hence the former need to be rendered as <video>, the latter as <iframe> 
    // the function will construct object accordingly, so that it could be utilized in <Card />
    // if neither, function will return null
    let video = null

    if (!obj.data.secure_media && !obj.data.preview && !obj.data.url_overridden_by_dest) {    // if no video in json return null
        // console.log("Nothing?", obj.data)
        return null
    }
    else {      // if media exists
        // if gifv (some made out format by imgur)
        if (obj.data.url_overridden_by_dest
            && obj.data.url_overridden_by_dest.includes('.gifv')) {
            let videoSrc = obj.data.url_overridden_by_dest.replace('.gifv', '.mp4');
            video = { videoProvider: "gifv", videoSrc }
            // console.log("GIFV", video)
        }
        // if reddit video 1
        else if (obj.data.secure_media
            && obj.data.secure_media.reddit_video
            && obj.data.secure_media.reddit_video.fallback_url) {
            const videoSrc = obj.data.secure_media.reddit_video.fallback_url
            video = { videoProvider: "reddit", videoSrc }
            // console.log("reddit 1", video)
        }
        // if reddit video 2
        else if (obj.data.preview
            && obj.data.preview.reddit_video_preview
            && obj.data.preview.reddit_video_preview.fallback_url) {
            const videoSrc = obj.data.preview.reddit_video_preview.fallback_url
            video = { videoProvider: "reddit", videoSrc }
            // console.log("reddit 2", video)
        }
        // if from youtube
        else if (obj.data.secure_media
            && obj.data.secure_media.oembed.html
            && obj.data.secure_media.oembed.html.includes('https://www.youtube.com')) {
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
                // console.log("youtube", video)
            }
        }
        else {
            // console.log("checked everything, still null", obj)
            return null
        }
    }
    return video
}