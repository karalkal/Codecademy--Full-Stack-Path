import { useLocation } from 'react-router-dom';
import Card from './Card';
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

            console.log("starting search for...", searchQuery)
            let foundPosts = await fetchSearchResult(searchQuery)

            let kur = createSimplifiedPostsArray(foundPosts.data.children)
            setpostsArray(kur)
            console.log("postsArray", postsArray)
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
                        <Card result={rslt} />
                    )}

                </div>
            </main>
        );
    };
}

export default Found;
