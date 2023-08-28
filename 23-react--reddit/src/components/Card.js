import styles from "./Card.module.css"
import { Link } from "react-router-dom"

export default function Card({ result }) {
    //text, author, icons, main_icon, upvotes, created_utc, media_metadata, secure_media


    // The Date constructor from Javascript accepts the number of milliseconds as timestamp, not unix time (number of seconds).
    // So, to adjust that, is just multiply the unix time by 1000.
    const unixTime = result.created_utc * 1000

    return (
        <Link to={result.url} className={styles.card}>
            <div  key={result.id} >
                
                <div className={styles.cardTitle}>{result.title}</div>
                <div className={styles.cardAuthor}>
                    Posted by&nbsp;
                    <span>{result.author}</span>
                    &nbsp;on&nbsp;
                    <span>{new Date(unixTime).toDateString()}</span>
                </div>

                <div className={styles.cardSubreddit}>
                    r/
                    <span>{result.subreddit}</span>
                </div>
                <div className={styles.cardText}>
                    {result.text.length > 170
                        ? `${(result.text).substring(0, 170)}...`
                        : `${result.text}`
                    }
                </div>
                <Link to={result.url} className={styles.linkToPost}>Visit</Link>
                
            </div>
        </Link>)
}
