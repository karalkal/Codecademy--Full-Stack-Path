import styles from "./Card.module.css"
import { Link } from "react-router-dom"

export default function Card({ result }) {
    //text, author, icons, main_icon, upvotes, created_utc, media_metadata, secure_media, permalink


    // The Date constructor from Javascript accepts the number of milliseconds as timestamp, not unix time (number of seconds).
    // So, to adjust that, is just multiply the unix time by 1000.
    const unixTime = result.created_utc * 1000
    const redditLink = "https://www.reddit.com" + result.permalink
    console.log(result.title, "Permalink:", result.permalink, "URL:", result.url)
    const videoFile = (
        <video muted controls className={styles.mediaCardContent} >
            <source src={result.secure_media} type="video/mp4" />
        </video>
    )

    const imgFile = (
        <img src="https://preview.redd.it/6j8wydgbm2lb1.png?auto=webp&amp;s=1e644bf1bbc32e8ea4a6aecb0fa9db9be4ba5f94"></img>
    )

    return (
        <Link to={redditLink} className={styles.card} key={result.id}>
            <div >
                {/* {imgFile} */}

                {result.secure_media ? <h1>{videoFile}</h1> : ""}
                <div className={styles.cardTitle}>{result.title}</div>
                <div className={styles.cardAuthor}>
                    Posted by&nbsp;
                    <span>{result.author}</span>
                    &nbsp;on&nbsp;
                    <span>{new Date(unixTime).toLocaleDateString()}</span>
                </div>

                <div className={styles.cardSubreddit}>
                    r/
                    <span>{result.subreddit}</span>
                </div>
                <div className={styles.cardText}>
                    {result.text.length > 260
                        ? `${(result.text).substring(0, 260)}...`
                        : `${result.text} `
                    }
                </div>
            </div>

            <Link to={redditLink} className={styles.linkToPost}>View</Link>
        </Link>)
}
