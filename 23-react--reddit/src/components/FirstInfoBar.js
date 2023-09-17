import { useNavigate } from "react-router-dom"

import styles from "./SubredditInfoBar.module.css"
import specificStyles from "./FirstInfoBar.module.css"
import blueLogo from "../misc/redditBluelogo.png";
import createSimplifiedPostsArray from '../utils/createSimplifiedPostsArray';
import { fetchPostsFromSubreddit } from '../api/api';


export default function FirstInfoBar({ setSelectedSubReddit, accessToken, selectedCriterion }) {
    const navigate = useNavigate()

    async function selectionHandler() {
        let fetchedResults = await fetchPostsFromSubreddit(accessToken, "/", selectedCriterion)
        let postsArray = createSimplifiedPostsArray(fetchedResults.data.children)

        setSelectedSubReddit({ url: "/", name: 'ALL', icon: blueLogo })
        localStorage.setItem("subR", JSON.stringify({ url: "/", name: 'ALL', icon: blueLogo }))

        const pathToNavigateTo = `ALL/${selectedCriterion}`

        navigate(pathToNavigateTo, { state: { postsArray } })
        // navigate("results", { state: { postsArray } })
    }

    return (
        <button
            className={specificStyles.firstBarContainer}
            onClick={selectionHandler}>
            <div className={styles.subRTopSection}>
                <img src={blueLogo} alt="reddit logo"></img>
                <div>
                    <p className={styles.subRTitle}>ALL REDDIT</p>
                    <p className={styles.subRURL}>data for whole platform</p>
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
