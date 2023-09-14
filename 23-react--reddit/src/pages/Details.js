import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"

import { decode as htmlDecode } from 'html-entities';    // deals with html entities which are not displayed properly in JSX

import { PiPencilLineLight } from "react-icons/pi";
import { TfiTime } from "react-icons/tfi";
import { PiArrowsDownUpLight } from "react-icons/pi";
import { VscCommentDraft } from "react-icons/vsc";

import Comment from "../components/Comment";
import styles from "./Details.module.css"
import { fetchPostDetails } from "../api/api";

import createSimplifiedPostsArray from "../utils/createSimplifiedPostsArray";
import formatUTCToDateAndTime from "../utils/formatUTCToDateAndTime";
import filterObjectForImageFiles from "../utils/filterObjectForImageFiles";
import createCommentsArray from "../utils/createCommentsArray";


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

            const comments = createCommentsArray(fetchedResults[1].data.children)
            setCommentsArray(comments)
        }

        getPostData();       // CALL THE FUNCTION
    }
        , [accessToken, id])


    const redditLink = "https://www.reddit.com" + postObj.permalink;
    const { formattedTime, formattedDate } = formatUTCToDateAndTime(postObj);
    const imageSrc = filterObjectForImageFiles(postObj);

    
    return (
        <main className={styles.mainContainer}>

            <div className={styles.innerHorizContainer}>

                <div className={styles.textCardContent}>

                    {/* {postObj.main_icons &&
                        <div className={styles.postIcons}>
                            {postObj.main_icons.map((bdg, index) =>
                                <img src={bdg.icon_url}
                                    alt={bdg.icon_name}
                                    title={`****    ${bdg.icon_name}    ****\n${bdg.icon_description}`}
                                    key={index}>
                                </img>
                            )}
                        </div>
                    } */}

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

            <div className={styles.commentsSection}>
                <h2 className={`${styles.postSubtitle}`}>Comments:</h2>
                {commentsArray.map(cmnt => (
                    <Comment comment={cmnt} />
                ))}
            </div>

            {/* visit link */}
            <Link to={redditLink} target="_blank" className={styles.linkToPost}>
                to Original Article
            </Link>
        </main>
    )
}

export default Details