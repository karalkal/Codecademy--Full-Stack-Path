import { useLoaderData, Link } from 'react-router-dom';
import Card from './Card';
import styles from "./GalleryContainer.module.css"
import getResultsArray from '../utils/getResultsArray';


const Best = () => {
    // Get results as prop from App.js which is gonna be loaded before it is rendered 
    const bestPosts = useLoaderData();

    const resultsArr = getResultsArray(bestPosts.data.children)

    return (
        <main className={styles.mainContainer}>
            <h1><span className={styles.galleryTitle}>Best</span>
                <span className={styles.gallerySubtitle}> (proportion of upvotes to downvotes)</span></h1>
            <div className={styles.galleryContainer}>
                {resultsArr.map(rslt =>
                    <Card result={rslt} />
                )}

            </div>
        </main>
    );
};

export default Best;
