import { useLoaderData, Link } from 'react-router-dom';
import Card from './Card';
import styles from "./GalleryContainer.module.css"
import createSimplifiedPostsArray from '../utils/createSimplifiedPostsArray';


const Best = () => {
    // Get results as prop from App.js which is gonna be loaded before it is rendered 
    const bestPosts = useLoaderData();

    const postsArray = createSimplifiedPostsArray(bestPosts.data.children)

    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.galleryTitle}>Best of all time</h1>
            <h3 className={styles.gallerySubtitle}> (Actual endpoint is '/top?limit=44&t=all'.
                Since app is userless /best returns the same as /hot)</h3>
            <div className={styles.galleryContainer}>
                {postsArray.map((rslt, idx) =>
                    <Card result={rslt} idx={idx} />
                )}

            </div>
        </main>
    );
};

export default Best;
