import { nanoid } from "nanoid"
import { decode as htmlDecode } from 'html-entities';    // deals with html entities which are not displayed properly in JSX
import styles from "./Card.module.css"
import { Link } from "react-router-dom"



export default function Card({ result }) {
    // The Date constructor from Javascript accepts the number of milliseconds as timestamp, not unix time (number of seconds).
    // So, to adjust that, is just multiply the unix time by 1000.
    const unixTime = result.created_utc * 1000
    const redditLink = "https://www.reddit.com" + result.permalink
    // if thumbnail is "self" (no idea what this is) or we have video (video has thumbnail attached too)
    // check for extension too as articles with no img also have "url_overridden_by_dest"
    let imageSrc = null
    if (result.img_thumbnail && !result.media
        && (result.img_thumbnail.slice(-4) === ".png" || result.img_thumbnail.slice(-4) === ".jpg")) {
        imageSrc = result.img_thumbnail
    }


    return (
        <Link to={redditLink} className={styles.card} target="_blank" id={nanoid()}>
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
                    Posted by&nbsp;
                    <span>{htmlDecode(result.author)}</span>
                    &nbsp;on&nbsp;
                    <span>{new Date(unixTime).toLocaleDateString()}</span>
                </div>
                {/* subreddit, text, rating*/}
                <div className={styles.cardSubreddit}>
                    r/
                    <span>{result.subreddit}</span>
                </div>
                <div className={styles.postRating}>
                    upvote_ratio &nbsp;
                    <span>{result.upvote_ratio}</span>
                </div>
                <div className={styles.cardText}>
                    {result.text.length > 260
                        ? `${htmlDecode((result.text).substring(0, 260))}...`
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
            {result.media &&
                <video
                    controls
                    className={styles.mediaCardContent} >
                    <source src={result.media} type="video/mp4" />
                    <source src={result.media} type="video/ogg" />
                    Your browser does not support the video tag.
                </video>
            }



        </Link>)

}
