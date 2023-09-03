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
            <h1><div className={styles.galleryTitle}>Best of all time</div>
                <div className={styles.gallerySubtitle}> (Actual endpoint is '/top?limit=44&t=all'. Since app is userless /best returns the same as /hot)</div></h1>
            <div className={styles.galleryContainer}>
                {resultsArr.map(rslt =>
                    <Card result={rslt} />
                )}

            </div>
        </main>
    );
};

export default Best;
