import { decode as htmlDecode } from 'html-entities';    // deals with html entities which are not displayed properly in JSX
import styles from "./Card.module.css"
import { Link } from "react-router-dom"

import { PiPencilLineLight } from "react-icons/pi";
import { PiRedditLogo } from "react-icons/pi";
import { PiCalendarBlankLight } from "react-icons/pi";
import { PiArrowsDownUpLight } from "react-icons/pi";
import { VscCommentDraft } from "react-icons/vsc";
import formatUTCToDateAndTime from '../utils/formatUTCToDateAndTime';
import filterObjectForImageFiles from '../utils/filterObjectForImageFiles';

//  TODO "&#x200b" does not render correctly

export default function Card({ result }) {
    const redditLink = "https://www.reddit.com" + result.permalink;
    const { formattedTime, formattedDate } = formatUTCToDateAndTime(result);
    const imageSrc = filterObjectForImageFiles(result)

    return (
        <Link to={`/post/${result.id.toString()}`} className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.textCardContent}>
                    {/* Icons and link*/}
                    <div className={styles.cardTopSection}>
                        {/* <div className={styles.cardIcons}>
                            {result.main_icons.map((bdg, index) =>
                                <img src={bdg.icon_url}
                                    alt={bdg.icon_name}
                                    title={`****    ${bdg.icon_name}    ****\n${bdg.icon_description}`}
                                    key={index}>
                                </img>
                            )}
                        </div> */}
                        {/* <div className={styles.linkToPost}>View</div> */}
                    </div>

                    {/* title, author, datestamp */}
                    <div className={styles.cardTitle}>{htmlDecode(result.title)}</div>
                    <div className={styles.cardInfo}>
                        <PiPencilLineLight />&nbsp;
                        posted&nbsp;by&nbsp;
                        <span>{htmlDecode(result.author)} </span>
                    </div>
                    <div className={styles.cardInfo}>
                        <PiCalendarBlankLight />&nbsp;
                        on&nbsp;
                        <span>{formattedDate}</span>
                    </div>
                    {/* subreddit, text, rating*/}
                    <div className={styles.cardInfo}>
                        <PiRedditLogo />&nbsp;
                        r/
                        <span>{result.subreddit}</span>
                    </div>
                    <div className={styles.cardInfo}>
                        <PiArrowsDownUpLight />&nbsp;
                        upvotes&nbsp;<span>{result.upvotes}</span>
                        &nbsp;/&nbsp;
                        ratio&nbsp;<span>{result.upvote_ratio}</span>
                    </div>
                    <div className={styles.cardInfo}>
                        <VscCommentDraft />&nbsp;
                        comments&nbsp;<span>{result.num_comments}</span>
                    </div>

                    <div className={styles.cardText}>
                        {result.text.length > 440
                            ? `${htmlDecode((result.text).substring(0, 440))}...`
                            : `${htmlDecode(result.text)} `
                        }
                    </div>

                </div>

                {/* IMG if any */}
                {imageSrc &&
                    <img src={imageSrc}
                        alt={`article titled ${result.title}`}
                        className={styles.mediaCardContent}>
                    </img>}
                {/* VIDEO if any */}
                {/* Reddit video */}
                {result.video && result.video.videoProvider === "reddit" &&
                    <video
                        controls
                        muted={false}
                        className={styles.mediaCardContent} >
                        <source src={result.video.videoSrc} type="video/mp4" />
                        <source src={result.video.videoSrc} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                }
                {/* gifv video */}
                {result.video && result.video.videoProvider === "gifv" &&
                    <video
                        controls
                        muted={false}
                        className={styles.mediaCardContent} >
                        <source src={result.video.videoSrc} type="video/mp4" />
                        <source src={result.video.videoSrc} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                }
                {/* Youtube iframe */}
                {result.video && result.video.videoProvider === "youtube" &&
                    <iframe title="youtubevideo" className={styles.mediaCardContent} src={result.video.videoSrc}></iframe>
                }
            </div>

            {/* visit link */}
            {/* <Link to={redditLink} target="_blank" className={styles.linkToPost}>
                visit
            </Link> */}
        </Link>)

}
