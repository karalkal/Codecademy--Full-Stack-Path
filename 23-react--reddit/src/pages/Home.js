import styles from "./Home.module.css"
import SubredditInfoBar from '../components/SubredditInfoBar';
import FirstInfoBar from "../components/FirstInfoBar";


const Home = ({ followedSubReddits, setSelectedSubReddit }) => {
    return (
        <main className={styles.mainContainer}>

            <h1 className={styles.galleryTitle}>Selected Subreddits</h1>
            
            <div className={styles.gallerySubtitle}>View Best/Top/Hot/Controversial Posts for a Subreddit</div>

            <div className={styles.galleryContainer}>
                <FirstInfoBar setSelectedSubReddit={setSelectedSubReddit} />

                {followedSubReddits.map(subr =>
                    <SubredditInfoBar
                        subr={subr}
                        key={subr.display_name}
                        setSelectedSubReddit={setSelectedSubReddit} />
                )}
            </div>

        </main>
    );
};


export default Home;
