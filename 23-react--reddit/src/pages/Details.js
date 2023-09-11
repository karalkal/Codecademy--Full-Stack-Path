import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"

import { decode as htmlDecode } from 'html-entities';    // deals with html entities which are not displayed properly in JSX
import { PiPencilLineLight } from "react-icons/pi";
import { IoLogoReddit } from "react-icons/io";
import { BsArrowDownUp } from "react-icons/bs";

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


    const redditLink = "https://www.reddit.com" + postObj.permalink

    // The Date constructor from Javascript accepts the number of milliseconds as timestamp, not unix time (number of seconds).
    // So, to adjust that, is just multiply the unix time by 1000.
    const unixTime = postObj.created_utc * 1000

    // if thumbnail is "self" (no idea what this is) or we have video (video has thumbnail attached too)
    // check for extension too as articles with no img also have "url_overridden_by_dest"
    // check for video  as well
    let imageSrc = null
    if (postObj.img_thumbnail && !postObj.media
        && (postObj.img_thumbnail.slice(-4) === ".png"
            || postObj.img_thumbnail.slice(-4) === ".jpg"
            || postObj.img_thumbnail.slice(-4) === ".gif")
    ) {
        imageSrc = postObj.img_thumbnail
    }


    return (
        <main className={styles.mainContainer}>

            {/* <img src={selectedSubReddit.icon} alt={selectedSubReddit.name} className={styles.galleryIcon}></img> */}
            <h1 className={styles.postTitle}>{postObj.title}</h1>
            <h2 className={styles.postSubtitle}>r/{postObj.subreddit}</h2>
            <div>
                <div className={styles.cardAuthor}>
                    <PiPencilLineLight />&nbsp;
                    Posted&nbsp;by&nbsp;
                    <span>{htmlDecode(postObj.author)} </span>
                    on&nbsp;
                    <span>{new Date(unixTime).toLocaleDateString()}</span>
                </div>
                {/* subreddit, text, rating*/}
                <div className={styles.cardSubreddit}>
                    <IoLogoReddit />&nbsp;
                    r/
                    <span>{postObj.subreddit}</span>
                </div>
                <div className={styles.postRating}>
                    <BsArrowDownUp />&nbsp;
                    upvotes&nbsp;<span>{postObj.upvotes}</span>
                    &nbsp;
                    / &nbsp;ratio&nbsp;<span>{postObj.upvote_ratio}</span>
                    / &nbsp;comments&nbsp;<span>{postObj.num_comments}</span>
                </div>
            </div>


            {/* visit link */}
            <Link to={redditLink} target="_blank" className={styles.linkToPost}>
                visit
            </Link>
        </main>
    )
}

export default Details