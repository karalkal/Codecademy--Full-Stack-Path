export default function getRelatedVideos(obj) {
    if (!obj.data.secure_media) {     // if no video in json   
        return null
    }
    else {
        if (obj.data.secure_media.reddit_video) {       // if reddit vides
            return obj.data.secure_media.reddit_video.fallback_url
        }
        else if (obj.data.secure_media.oembed.html) {
            /*
            it will look sometthing like:
            &lt;iframe width="356" height="200" src="https://www.youtube.com/embed/9RFMQEEmU8g?feature=oembed&amp;enablejsapi=1" frameborder="0" .....
            need to extract just the src bit
            */

            console.log(obj.data.secure_media.oembed.html);
            const htmlOfJson = obj.data.secure_media.oembed.html
            const indexOfSrcTag = htmlOfJson.indexOf('src="')
            const indexOfTrailingSemiColon = htmlOfJson.indexOf('"', indexOfSrcTag + 40)
            const srcLink = htmlOfJson.slice(indexOfSrcTag, indexOfTrailingSemiColon)
            return srcLink
        }
        else {
            return null
        }
    }
}