import { useLoaderData, Link } from 'react-router-dom';
import Card from '../components/Card';
import styles from "./GalleryContainer.module.css"

import createSimplifiedPostsArray from '../utils/createSimplifiedPostsArray';


const Best = () => {
    // Get results as prop from App.js which is gonna be loaded before it is rendered 
    const bestPosts = useLoaderData();

    const postsArray = createSimplifiedPostsArray(bestPosts.data.children)

    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.galleryTitle}>Best of All Time</h1>
            <h3 className={styles.gallerySubtitle}>
                Since app is userless /best would return the same results as /hot. Hence here app is getting the top results of all times instead.
            </h3>
            <div className={styles.galleryContainer}>
                {postsArray.map(rslt =>
                    <Card result={rslt} key={rslt.id} />
                )}

            </div>
        </main>
    );
};

export default Best;
