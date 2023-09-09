import { useNavigate } from "react-router-dom"
import styles from "./SubredditInfoBar.module.css"
import logo from "../misc/redditBluelogo.png";

export default function FirstInfoBar({ setSelectedSubReddit }) {
    const navigate = useNavigate()

    function selectionHandler() {
        setSelectedSubReddit({
            url: "/",
            name: 'ALL',
            icon: logo
        })
        navigate('subreddit', {
            // state: { selectedSubReddit, selectedCriterion }
        })
    }

    return (
        <button
            className={styles.subRBarContainer}
            onClick={selectionHandler}>
            <div className={styles.subRTopSection}>
                <img src={logo} alt="reddit logo"></img>
                <div>
                    <p className={styles.subRTitle}>ALL REDDIT</p>
                    <p className={styles.subRURL}>results for the platform as a whole</p>
                </div>
            </div>

            <div className={styles.subRMiddleSection}>
                <div>
                    <p>Created</p>
                    <p>23/06/2005</p>
                </div>
                <div>
                    <p>DAU</p>
                    <p>~55 M</p>
                </div>
                <div>
                    <p>MAU</p>
                    <p>~1.7 Bn</p>
                </div>
            </div>

            <div className={styles.subRBottomSection}>
                <p>Reddit is an American social news aggregation, content rating, and discussion website. Registered users submit content to the site such as links, text posts, images, and videos, which are then voted up or down by other members. </p>
            </div>

            {/* <div className={styles.subRButtonsDiv}>
                <button className={styles.subRButton} onClick={() => selectionHandler(subr.url, "best")}>
                    best
                </button>
                <button className={styles.subRButton} onClick={() => selectionHandler(subr.url, "top")}>
                    top
                </button>
                <button className={styles.subRButton} onClick={() => selectionHandler(subr.url, "hot")}>
                    hot
                </button>
                <button className={styles.subRButton} onClick={() => selectionHandler(subr.url, "controversial")}>
                    contro
                </button>
            </div> */}
        </button >
    )
}
