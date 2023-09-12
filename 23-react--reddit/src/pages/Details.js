import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"

import { decode as htmlDecode } from 'html-entities';    // deals with html entities which are not displayed properly in JSX

import { PiPencilLineLight } from "react-icons/pi";
import { TfiTime } from "react-icons/tfi";
import { PiArrowsDownUpLight } from "react-icons/pi";
import { VscCommentDraft } from "react-icons/vsc";

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


    const redditLink = "https://www.reddit.com" + postObj.permalink

    // The Date constructor from Javascript accepts the number of milliseconds as timestamp, not unix time (number of seconds).
    // So, to adjust that, is just multiply the unix time by 1000.
    const unixTime = postObj.created_utc * 1000
    let date = new Date(unixTime);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedTime = hours + 'h ' + minutes.substr(-2) + 'm ' + seconds.substr(-2) + "s";
    let formattedDate = date.toLocaleDateString()

    // if thumbnail is "self" (no idea what this is) or we have video (video has thumbnail attached too)
    // check for extension too as articles with no img also have "url_overridden_by_dest"
    // check for video  as well
    let imageSrc = null
    if (postObj.img_thumbnail && !postObj.media
        && (postObj.img_thumbnail.slice(-4) === ".png"
            || postObj.img_thumbnail.slice(-4) === ".jpg"
            || postObj.img_thumbnail.slice(-4) === ".gif")) {
        imageSrc = postObj.img_thumbnail
    }


    return (
        <main className={styles.mainContainer}>

            <div className={styles.innerHorizContainer}>

                <div className={styles.textCardContent}>

                    {postObj.main_icons &&
                        <div className={styles.postIcons}>
                            {postObj.main_icons.map((bdg, index) =>
                                <img src={bdg.icon_url}
                                    alt={bdg.icon_name}
                                    title={`****    ${bdg.icon_name}    ****\n${bdg.icon_description}`}
                                    key={index}>
                                </img>
                            )}
                        </div>
                    }

                    <div className={styles.postTopSection}>
                        <h1 className={styles.postTitle}>{postObj.title}</h1>
                        {/* <img src={selectedSubReddit.icon} alt={selectedSubReddit.name} className={styles.galleryIcon}></img> */}
                        <h2 className={styles.postSubtitle}>r/{postObj.subreddit}</h2>
                    </div>

                    <div className={styles.postMidSection}>
                        <div>
                            <PiPencilLineLight />&nbsp;
                            posted&nbsp;by&nbsp;
                            <span>{htmlDecode(postObj.author)} </span>
                        </div>
                        <div>
                            <TfiTime />&nbsp;
                            on&nbsp;
                            <span>{formattedDate} </span>
                            at <span>{formattedTime}</span>
                        </div>
                        {/* subreddit, text, rating*/}
                        <div>
                            <PiArrowsDownUpLight />&nbsp;
                            upvotes&nbsp;<span>{postObj.upvotes}</span>
                            &nbsp;
                            / &nbsp;ratio&nbsp;<span>{postObj.upvote_ratio}</span>
                        </div>
                        <div>
                            <VscCommentDraft />&nbsp;
                            comments&nbsp;<span>{postObj.num_comments}</span>
                        </div>
                    </div>

                    <div className={styles.postText}>
                        {htmlDecode(postObj.text)}
                    </div>

                </div>

                {/* MEDIA DIV IF ANY */}
                {/* IMG if any */}
                {imageSrc &&
                    <img src={imageSrc}
                        alt={`article titled ${postObj.title}`}
                        className={styles.mediaCardContent}>
                    </img>}
                {/* VIDEO if any */}
                {/* Reddit video */}
                {postObj.video && postObj.video.videoProvider === "reddit" &&
                    <video
                        controls
                        muted={false}
                        className={styles.mediaCardContent} >
                        <source src={postObj.video.videoSrc} type="video/mp4" />
                        <source src={postObj.video.videoSrc} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                }
                {/* gifv video */}
                {postObj.video && postObj.video.videoProvider === "gifv" &&
                    <video
                        controls
                        muted={false}
                        className={styles.mediaCardContent} >
                        <source src={postObj.video.videoSrc} type="video/mp4" />
                        <source src={postObj.video.videoSrc} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                }
                {/* Youtube iframe */}
                {postObj.video && postObj.video.videoProvider === "youtube" &&
                    <iframe title="youtubevideo" className={styles.mediaCardContent} src={postObj.video.videoSrc}></iframe>

                }
            </div>

            {/* visit link */}
            <Link to={redditLink} target="_blank" className={styles.linkToPost}>
                to Original Article
            </Link>
        </main>
    )
}

export default Details