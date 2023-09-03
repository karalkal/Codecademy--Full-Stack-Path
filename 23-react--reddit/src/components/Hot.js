import { useLoaderData, Link } from 'react-router-dom';
import Card from './Card';
import styles from "./GalleryContainer.module.css"
import getResultsArray from '../utils/getResultsArray';


const Hot = () => {
    // Get results as prop from App.js which is gonna be loaded before it is rendered 
    const hottestPosts = useLoaderData();
    
    const resultsArr = getResultsArray(hottestPosts.data.children)

    return (
        <main className={styles.mainContainer}>
            <h1><div className={styles.galleryTitle}>Hot</div>
                <div className={styles.gallerySubtitle}> (upvoted fresher posts)</div></h1>
            <div className={styles.galleryContainer}>
                {resultsArr.map(rslt =>
                    <Card result={rslt} />
                )}

            </div>
        </main>
    );
};

export default Hot;
