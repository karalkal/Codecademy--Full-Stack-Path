import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import styles from "./Details.module.css"
import { fetchPostDetails } from "../api/api";
import createSimplifiedPostsArray from "../utils/createSimplifiedPostsArray";

function Details({ accessToken, setDynamicUrlPath }) {
    const { id } = useParams();
    const [postObj, setPostObj] = useState({})
    const [commentsArray, setCommentsArray] = useState([])

    useEffect(() => {
        async function getPostData() {
            let fetchedResults = await fetchPostDetails(accessToken, id)
            // I believe [0] is the actual post - an array of one object, 
            // [1] are the comments data.children -> array of objects -> data
            let post = createSimplifiedPostsArray(fetchedResults[0].data.children)

            setPostObj(post[0])     // remember: post will be an array with single child
            // setCommentsArray(comments)
        }

        getPostData();       // CALL THE FUNCTION
    }
        , [accessToken, id])

    console.log(postObj)
    // console.log(commentsArray)

    return (<main className={styles.mainContainer}>

        <div className={styles.galleryTitle}>
            <span className={styles.galleryCriterion}>Post
                &nbsp;in&nbsp;
            </span>
            {/* <img src={selectedSubReddit.icon} alt={selectedSubReddit.name} className={styles.galleryIcon}></img> */}
            <span className={styles.galleryRedditName}>{postObj.title}</span>
        </div>

        <h2 className={styles.gallerySubtitle}>r/{postObj.subreddit}</h2>
    </main>
    )
}

export default Details