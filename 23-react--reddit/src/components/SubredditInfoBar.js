import { nanoid } from "nanoid"
import styles from "./SubredditInfoBar.module.css"
import { Link } from "react-router-dom"
import { BsArrowDownUp } from "react-icons/bs";
import logo from "./images/logo.png";
console.log(logo)

export default function SubredditInfoBar({ result }) {
    const subredditURL = "https://www.reddit.com" + result.url

    // The Date constructor from Javascript accepts the number of milliseconds as timestamp, not unix time (number of seconds).
    // So, to adjust that, is just multiply the unix time by 1000.
    const unixTime = result.created_utc * 1000

    let srIcon = result.icon_img === "" ? `${logo}`: result.icon_img
    console.log(srIcon)

    return (
        <Link to="" className={styles.subRBarContainer} id={nanoid()}>
            <div className={styles.subRTopSection}>
                <img src={srIcon} alt={result.display_name}></img>
                <div>
                    <div className={styles.subRTitle}>{result.searchedName}</div>
                    <div className={styles.subRURL}></div>
                </div>
            </div>

            <div className={styles.subRMainSection}>Started&nbsp;on&nbsp;
                <span>{new Date(unixTime).toLocaleDateString()}</span>
            </div>

        </Link >
    )
}
