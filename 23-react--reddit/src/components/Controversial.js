import { useLoaderData, Link } from 'react-router-dom';
import Card from './Card';
import styles from "./GalleryContainer.module.css"
import getResultsArray from '../utils/getResultsArray';


const Controversial = () => {
    // Get results as prop from App.js which is gonna be loaded before it is rendered 
    const mostContraversialPosts = useLoaderData();
    
    const resultsArr = getResultsArray(mostContraversialPosts.data.children)

    return (
        <main className={styles.mainContainer}>
            <h1><div className={styles.galleryTitle}>Controversial</div>
                <div className={styles.gallerySubtitle}> (number of upvotes is roughly equal to number of downvotes)</div></h1>
            <div className={styles.galleryContainer}>
                {resultsArr.map(rslt =>
                    <Card result={rslt} />
                )}

            </div>
        </main>
    );
};

export default Controversial;
