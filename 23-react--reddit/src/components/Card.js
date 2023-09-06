import { decode as htmlDecode } from 'html-entities';    // deals with html entities which are not displayed properly in JSX
import styles from "./Card.module.css"
import { Link } from "react-router-dom"
import { PiPencilLineLight } from "react-icons/pi";
import { IoLogoReddit } from "react-icons/io";
import { BsArrowDownUp } from "react-icons/bs";

//  TODO "&#x200b" does not render correctly

export default function Card({ result }) {
    const redditLink = "https://www.reddit.com" + result.permalink

    // The Date constructor from Javascript accepts the number of milliseconds as timestamp, not unix time (number of seconds).
    // So, to adjust that, is just multiply the unix time by 1000.
    const unixTime = result.created_utc * 1000

    // if thumbnail is "self" (no idea what this is) or we have video (video has thumbnail attached too)
    // check for extension too as articles with no img also have "url_overridden_by_dest"
    let imageSrc = null
    if (result.img_thumbnail && !result.media
        && (result.img_thumbnail.slice(-4) === ".png" || result.img_thumbnail.slice(-4) === ".jpg")) {
        imageSrc = result.img_thumbnail
    }

    return (
        <Link to={redditLink} target="_blank" className={styles.cardContainer} key={result.id}>
            <div className={styles.card}>
                <div className={styles.textCardContent}>
                    {/* Icons and link*/}
                    <div className={styles.cardTopSection}>
                        <div className={styles.cardIcons}>
                            {result.main_icons.map((bdg, index) =>
                                <img src={bdg.icon_url}
                                    alt={bdg.icon_name}
                                    title={`****    ${bdg.icon_name}    ****\n${bdg.icon_description}`}
                                    key={index}>
                                </img>
                            )}
                        </div>
                        {/* <div className={styles.linkToPost}>View</div> */}
                    </div>

                    {/* title, author, datestamp */}
                    <div className={styles.cardTitle}>{htmlDecode(result.title)}</div>
                    <div className={styles.cardAuthor}>
                        <PiPencilLineLight />&nbsp;
                        Posted&nbsp;by&nbsp;
                        <span>{htmlDecode(result.author)} </span>
                        on&nbsp;
                        <span>{new Date(unixTime).toLocaleDateString()}</span>
                    </div>
                    {/* subreddit, text, rating*/}
                    <div className={styles.cardSubreddit}>
                        <IoLogoReddit />&nbsp;
                        r/
                        <span>{result.subreddit}</span>
                    </div>
                    <div className={styles.postRating}>
                        <BsArrowDownUp />&nbsp;
                        upvotes&nbsp;<span>{result.upvotes}</span>
                        &nbsp;
                        / &nbsp;ratio&nbsp;<span>{result.upvote_ratio}</span>
                        / &nbsp;comments&nbsp;<span>{result.num_comments}</span>
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
                        className={styles.mediaCardContent} >
                        <source src={result.video.videoSrc} type="video/mp4" />
                        <source src={result.video.videoSrc} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                }
                {/* Youtube iframe */}
                {result.video && result.video.videoProvider === "youtube" &&
                    <iframe title="gyz" className={styles.mediaCardContent} src={result.video.videoSrc}></iframe>
                }
            </div>

            {/* vitit link */}
            {/* <Link to={redditLink} target="_blank" className={styles.linkToPost}>
                visit
            </Link> */}
        </Link>)

}
