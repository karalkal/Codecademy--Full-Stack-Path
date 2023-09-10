import styles from "./Home.module.css"
import SubredditInfoBar from '../components/SubredditInfoBar';
import FirstInfoBar from "../components/FirstInfoBar";


const Home = ({ followedSubReddits, setSelectedSubReddit, setSelectedCriterion, accessToken, selectedCriterion, setDynamicUrlPath }) => {
    // default is "best"
    setSelectedCriterion('best');

    return (
        <main className={styles.mainContainer}>

            <h1 className={styles.galleryTitle}>Selected Subreddits</h1>

            <h2 className={styles.gallerySubtitle}>View Best/Top/Hot/Controversial Posts for a Subreddit</h2>

            <div className={styles.galleryContainer}>
                <FirstInfoBar
                    setSelectedSubReddit={setSelectedSubReddit}
                    accessToken={accessToken}
                    selectedCriterion={selectedCriterion}
                    setDynamicUrlPath={setDynamicUrlPath}
                />

                {followedSubReddits.map(subr =>
                    <SubredditInfoBar
                        key={subr.url}
                        subr={subr}
                        setSelectedSubReddit={setSelectedSubReddit}
                        accessToken={accessToken}
                        selectedCriterion={selectedCriterion}
                        setDynamicUrlPath={setDynamicUrlPath}
                    />
                )}
            </div>

        </main>
    );
};


export default Home;
