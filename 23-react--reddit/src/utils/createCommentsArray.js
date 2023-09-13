export default function createCommentsArray(comments) {
    // TODO (at some point)
    // each comment has replies/comments with has replies/comments... might be many nested props, see also depth: 0
    let commentsArr = comments.map(cm => {
        return {
            author: cm.data.author,
            body: cm.data.body,
            body_html: cm.data.body_html,
            created_utc: cm.data.created_utc,
            ups: cm.data.ups,
            replies: cm.data.replies,
            depth: cm.data.depth
        }
    })

    return commentsArr
}