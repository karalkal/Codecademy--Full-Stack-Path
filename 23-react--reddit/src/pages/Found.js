import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import styles from "./GalleryContainer.module.css"

import createSimplifiedPostsArray from '../utils/createSimplifiedPostsArray';
import { useEffect, useState } from 'react';
import { fetchSearchResult } from '../api/api';


const Found = () => {
    const [postsArray, setpostsArray] = useState([])

    const location = useLocation()

    let searchQuery = location.state.searchQuery

    //fetch results
    useEffect(() => {
        async function getResults() {
            let foundPosts = await fetchSearchResult(searchQuery)

            let res = createSimplifiedPostsArray(foundPosts.data.children)
            setpostsArray(res)
        }

        getResults();       // CALL THE FUNCTION
        // cleanup?
    }
        , [searchQuery])

    if (postsArray) {
        return (
            <main className={styles.mainContainer}>
                <h1 className={styles.galleryTitle}>Top results for "{searchQuery}"</h1>
                <h3 className={styles.gallerySubtitle}> (sorted by relevance)</h3>
                <div className={styles.galleryContainer}>
                    {postsArray.map(rslt =>
                        <Card result={rslt} key={rslt.id} />
                    )}

                </div>
            </main>
        );
    };
}

export default Found;
