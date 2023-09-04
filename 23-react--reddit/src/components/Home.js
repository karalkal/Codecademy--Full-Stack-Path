import { useLoaderData, Link } from 'react-router-dom';
import styles from "./GalleryContainer.module.css"
import SubredditInfoBar from './SubredditInfoBar';


const Home = ({ setSelectedSubReddit, setSelectedCriterion }) => {
    // Get results as prop from App.js which is gonna be loaded before it is rendered 
    const hottestPosts = useLoaderData();

    console.log(hottestPosts)
    return (
        <main className={styles.mainContainer}>
            <h1><div className={styles.galleryTitle}>Favourite Subreddits</div>
                <div className={styles.gallerySubtitle}> (think of subtitle)</div></h1>
            <div className={styles.galleryContainer}>
                {hottestPosts.map(rslt =>
                    <SubredditInfoBar
                        result={rslt}
                        setSelectedSubReddit={setSelectedSubReddit}
                        setSelectedCriterion={setSelectedCriterion}
                    />
                )}

            </div>
        </main>
    );
};

export default Home;
