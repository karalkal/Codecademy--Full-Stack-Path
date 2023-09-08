import { nanoid } from "nanoid";
import styles from "./GalleryContainer.module.css"

import SubredditInfoBar from '../components/SubredditInfoBar';


const Home = ({ followedSubReddits, setSelectedSubReddit }) => {
    return (
        <main className={styles.mainContainer}>
            <h1><div className={styles.galleryTitle}>Selected Subreddits</div>
                <div className={styles.gallerySubtitle}>View Best/Top/Hot/Controversial Posts for a Subreddit</div></h1>

            <div className={styles.galleryContainer}>
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
