import { nanoid } from "nanoid";
import styles from "./GalleryContainer.module.css"
import SubredditInfoBar from './SubredditInfoBar';


const Home = ({ followedSubReddits }) => {
    return (
        <main className={styles.mainContainer}>
            <h1><div className={styles.galleryTitle}>Selected Subreddits</div>
                <div className={styles.gallerySubtitle}> (best / top / hot / controversial posts for a subreddit)</div></h1>

            <div className={styles.galleryContainer}>
                {followedSubReddits.map(subr =>
                    <SubredditInfoBar subr={subr} />
                )}
            </div>

        </main>
    );
};


export default Home;
