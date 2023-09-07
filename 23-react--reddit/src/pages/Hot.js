import { useLoaderData, Link } from 'react-router-dom';
import Card from '../components/Card';
import styles from "./GalleryContainer.module.css"

import createSimplifiedPostsArray from '../utils/createSimplifiedPostsArray';


const Hot = () => {
    // Get results as prop from App.js which is gonna be loaded before it is rendered 
    const hottestPosts = useLoaderData();

    const postsArray = createSimplifiedPostsArray(hottestPosts.data.children)

    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.galleryTitle}>Recent Hot  Posts</h1>
            <h3 className={styles.gallerySubtitle}> Upvoted fresher posts</h3>
            <div className={styles.galleryContainer}>
                {postsArray.map(rslt =>
                    <Card result={rslt} key={rslt.id} />
                )}

            </div>
        </main>
    );
};

export default Hot;
