import styles from "./Home.module.css"
import SubredditInfoBar from '../components/SubredditInfoBar';
import FirstInfoBar from "../components/FirstInfoBar";
import { useEffect } from "react";
import blueLogo from "../misc/redditBluelogo.png";
import { useLoaderData } from "react-router-dom";


const Home = ({ setSelectedSubReddit, selectedCriterion, setSelectedCriterion, accessToken }) => {
    const followedSubReddits = useLoaderData()

    // Default is "best", reset it so whenever new subr is selected initial request will be to "best", 
    // not whatever the prev state was.
    // useEffect to avoid "Warning: Cannot update a component (`App`) while rendering a different component (`Home`)."

    //RESET SUBREDDIT AND CRITERION => when in Home these are no longer needed
    useEffect(() => {
        localStorage.setItem("subR", JSON.stringify(
            { url: "/", name: 'ALL', icon: blueLogo }
        ))
        localStorage.setItem("crit", "best")

        // It is probably ok to set states directly, but in order to have single source of truth:
        setSelectedSubReddit(JSON.parse(localStorage.getItem("subR")))
        setSelectedCriterion('best');

    }, [])

 
    return (
        <>
            <h1 className={styles.galleryTitle}>Selected Subreddits</h1>

            <h2 className={styles.gallerySubtitle}>View Best/Top/Hot/Controversial Posts for a Subreddit</h2>

            <div className={styles.galleryContainer}>
                <FirstInfoBar
                    setSelectedSubReddit={setSelectedSubReddit}
                    accessToken={accessToken}
                    selectedCriterion={selectedCriterion}
                />

                {followedSubReddits.map(subr =>
                    <SubredditInfoBar
                        key={subr.url}
                        subr={subr}
                        setSelectedSubReddit={setSelectedSubReddit}
                        accessToken={accessToken}
                        selectedCriterion={selectedCriterion}
                    />
                )}
            </div>

        </>
    );
};


export default Home;
