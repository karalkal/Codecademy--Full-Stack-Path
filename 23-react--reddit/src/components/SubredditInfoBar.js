import { nanoid } from "nanoid"
import styles from "./SubredditInfoBar.module.css"
import { Link } from "react-router-dom"
import { BsArrowDownUp } from "react-icons/bs";
import logo from "../misc/redditB&Wlogo.png";

export default function SubredditInfoBar({
    result,
    setSelectedSubReddit,
    setSelectedCriterion }) {
    const subredditURL = "https://www.reddit.com" + result.url

    // The Date constructor from Javascript accepts the number of milliseconds as timestamp, not unix time (number of seconds).
    // So, to adjust that, is just multiply the unix time by 1000.
    const unixTime = result.created_utc * 1000

    let srIcon = result.icon_img === "" ? `${logo}` : result.icon_img

    function selecetionHandler(subr, crit) {
        setSelectedSubReddit(subr)
        setSelectedCriterion(crit)
    }

    return (
        <div className={styles.subRBarContainer} id={nanoid()}>
            <div className={styles.subRTopSection}>
                <img src={srIcon} alt={result.display_name}></img>
                <div>
                    <p className={styles.subRTitle}>{result.title}</p>
                    <p className={styles.subRURL}>{result.url}</p>
                </div>
            </div>

            <div className={styles.subRMiddleSection}>
                <div>
                    <p>Started</p>
                    <p className={styles.subRMiddleSectionBold}>{new Date(unixTime).toLocaleDateString()}                    </p>
                </div>
                <div>
                    <p>Members</p>
                    <p className={styles.subRMiddleSectionBold}>{result.accounts_active}</p>
                </div>
                <div>
                    <p>Active</p>
                    <p className={styles.subRMiddleSectionBold}> {result.accounts_active}</p>
                </div>
            </div>

            <div className={styles.subRBottomSection}>
                <p>{result.public_description}</p>
            </div>

            <div className={styles.subRButtonsDiv}>
                <button className={styles.subRButton} onClick={() => selecetionHandler(result.url, "best")}>
                    best
                </button>
                <button className={styles.subRButton} onClick={() => selecetionHandler(result.url, "top")}>
                    top
                </button>
                <button className={styles.subRButton} onClick={() => selecetionHandler(result.url, "hot")}>
                    hot
                </button>
                <button className={styles.subRButton} onClick={() => selecetionHandler(result.url, "controversial")}>
                    contro
                </button>
            </div>




        </div >
    )
}
