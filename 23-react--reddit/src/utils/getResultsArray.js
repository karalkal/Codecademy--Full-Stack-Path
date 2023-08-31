import getRelatedVideos from "./getRelatedVideos"

export default function getResultsArray(largeJson) {
    let result = largeJson.map(obj => {
        return {
            id: obj.data.id,
            title: obj.data.title,
            text: obj.data.selftext,
            author: obj.data.author,
            subreddit: obj.data.subreddit,
            permalink: obj.data.permalink,
            url: obj.data.url,
            main_icons: (obj.data.all_awardings).map(award => {
                return {
                    icon_url: award.icon_url,
                    icon_description: award.description,
                    icon_name: award.name,
                }
            }),
            upvotes: obj.data.ups,
            upvote_ratio: obj.data.upvote_ratio,
            created_utc: obj.data.created_utc,
            img_thumbnail: obj.data.url_overridden_by_dest,
            img_url: obj.data.preview === undefined
                ? null
                : obj.data.preview.images[0].source.url,
            // can have external videos as well
            media: getRelatedVideos(obj)
        }
    })

    return result
}