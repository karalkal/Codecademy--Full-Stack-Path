import { useLoaderData, Link } from 'react-router-dom';
import Card from '../components/Card';
import styles from "./GalleryContainer.module.css"

import createSimplifiedPostsArray from '../utils/createSimplifiedPostsArray';


const Controversial = () => {
    // Get results as prop from App.js which is gonna be loaded before it is rendered 
    const mostContraversialPosts = useLoaderData();

    const postsArray = createSimplifiedPostsArray(mostContraversialPosts.data.children)

    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.galleryTitle}>Recent Controversial Posts</h1>
            <h3 className={styles.gallerySubtitle}> Number of upvotes is roughly equal to number of downvotes</h3>
            <div className={styles.galleryContainer}>
                {postsArray.map(rslt =>
                    <Card result={rslt} key={rslt.id} />
                )}

            </div>
        </main >
    );
};

export default Controversial;
