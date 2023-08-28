import styles from "./Card.module.css"
import Button from "./Button"
import { Link } from "react-router-dom"

export default function Card({ result }) {

    return (
        <div className={styles.card} key={result.id}>

            <div className={styles.cardTitle}>{result.title}</div>
            <div className={styles.cardSubreddit}>{result.subreddit}</div>
            <Link to={result.url}>click to visit</Link>
            <div className={styles.cardUrl}>{result.url}</div>



        </div>)
}
