import { useLoaderData, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import styles from "./GalleryContainer.module.css"
import getResultsArray from '../utils/getResultsArray';
import { useEffect, useState } from 'react';
import { fetchSearchResult } from '../api/api';


const Found = () => {
    const [resultsArr, setResultsArr] = useState([])

    const location = useLocation()

    let searchQuery = location.state.searchQuery

    //fetch results
    useEffect(() => {
        async function getResults() {

            console.log("starting search for...", searchQuery)
            let foundPosts = await fetchSearchResult(searchQuery)

            let kur = getResultsArray(foundPosts.data.children)
            setResultsArr(kur)
            console.log("resultsArr", resultsArr)
        }
        getResults();
        // cleanup?
    }
        , [searchQuery])

    if (resultsArr) {
        return (
            <main className={styles.mainContainer}>
                <h1><span className={styles.galleryTitle}>Top results for "{searchQuery}"</span>
                    <span className={styles.gallerySubtitle}> (sorted by most commented on)</span></h1>
                <div className={styles.galleryContainer}>
                    {resultsArr.map(rslt =>
                        <Card result={rslt} />
                    )}
    
                </div>
            </main>
        );
    };
}

export default Found;
