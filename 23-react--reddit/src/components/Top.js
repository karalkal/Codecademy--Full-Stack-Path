import { useLoaderData, Link } from 'react-router-dom';
import Card from './Card';
import styles from "./GalleryContainer.module.css"
import getResultsArray from '../utils/getResultsArray';


const Top = (props) => {
    // Get results as prop from App.js which is gonna be loaded before it is rendered 
    const topPosts = useLoaderData();

    const resultsArr = getResultsArray(topPosts.data.children)

    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.galleryTitle}>This week's Top</h1>
            <h3 className={styles.gallerySubtitle}> (like raw score, upvotes minus downvotes.)</h3>
            <div className={styles.galleryContainer}>
                {resultsArr.map(rslt =>
                    <Card result={rslt} />
                )}

            </div>
        </main>
    );
};

export default Top;
