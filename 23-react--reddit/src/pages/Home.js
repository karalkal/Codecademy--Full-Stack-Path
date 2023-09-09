import styles from "./Home.module.css"
import SubredditInfoBar from '../components/SubredditInfoBar';
import FirstInfoBar from "../components/FirstInfoBar";


const Home = ({ followedSubReddits, selectedCriterion, setSelectedSubReddit }) => {
    return (
        <main className={styles.mainContainer}>

            <h1 className={styles.galleryTitle}>Selected Subreddits</h1>

            <h2 className={styles.gallerySubtitle}>View Best/Top/Hot/Controversial Posts for a Subreddit</h2>

            <div className={styles.galleryContainer}>
                <FirstInfoBar
                    selectedCriterion={selectedCriterion}
                    setSelectedSubReddit={setSelectedSubReddit} />

                {followedSubReddits.map(subr =>
                    <SubredditInfoBar
                        key={subr.url}
                        subr={subr}
                        selectedCriterion={selectedCriterion}
                        setSelectedSubReddit={setSelectedSubReddit} />
                )}
            </div>

        </main>
    );
};


export default Home;
