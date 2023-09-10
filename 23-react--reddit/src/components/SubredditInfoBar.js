import { useNavigate } from "react-router-dom"

import styles from "./SubredditInfoBar.module.css"
import logo from "../misc/redditB&Wlogo.png";
import createSimplifiedPostsArray from '../utils/createSimplifiedPostsArray';
import { fetchPostsFromSubreddit } from '../api/api';


export default function SubredditInfoBar({ subr, accessToken, setSelectedSubReddit, selectedCriterion }) {

    const navigate = useNavigate()

    // The Date constructor from Javascript accepts the number of milliseconds as timestamp, not unix time (number of seconds).
    // So, to adjust that, is just multiply the unix time by 1000.
    const unixTime = subr.created_utc * 1000

    let srIcon = subr.icon_img === "" ? `${logo}` : subr.icon_img

    async function selectionHandler(clickedSubreddit) {
        let fetchedResults = await fetchPostsFromSubreddit(accessToken, clickedSubreddit.url, selectedCriterion)
        let postsArray = createSimplifiedPostsArray(fetchedResults.data.children)
        
        setSelectedSubReddit(clickedSubreddit)

        navigate(`${clickedSubreddit.name}/${selectedCriterion}`, { state: { postsArray } })
        // navigate("results", { state: { postsArray } })
    }

    return (
        <button
            className={styles.subRBarContainer}
            onClick={() => selectionHandler(
                {
                    url: subr.url,
                    name: subr.display_name,
                    icon: srIcon
                }
            )}>

            <div className={styles.subRTopSection}>
                <img src={srIcon} alt={subr.display_name}></img>
                <div>
                    <p className={styles.subRTitle}>{subr.title}</p>
                    <p className={styles.subRURL}>{subr.url}</p>
                </div>
            </div>

            <div className={styles.subRMiddleSection}>
                <div>
                    <p>Started</p>
                    <p>{new Date(unixTime).toLocaleDateString()}                    </p>
                </div>
                <div>
                    <p>Members</p>
                    <p>{subr.accounts_active}</p>
                </div>
                <div>
                    <p>Active</p>
                    <p> {subr.accounts_active}</p>
                </div>
            </div>

            <div className={styles.subRBottomSection}>
                <p>{subr.public_description}</p>
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
