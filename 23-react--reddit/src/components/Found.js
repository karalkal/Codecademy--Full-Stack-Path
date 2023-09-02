import { useLoaderData, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import styles from "./GalleryContainer.module.css"
import getResultsArray from '../utils/getResultsArray';
import { useEffect, useState } from 'react';
import { fetchSearchResult } from '../api/api';

let counter = 1
const Found = () => {
    const [results, setResults] = useState({})
    const location = useLocation()
    let searchQuery = location.state.sq
    console.log("Mounted", counter)
    counter ++

    console.log("Will be searching for...", searchQuery)

    //fetch results
    useEffect(() => {
        async function getResults() {
            let kur = await fetchSearchResult(searchQuery)
            setResults(kur)
        }
        getResults();

        // cleanup?
        return () => {
        }

    },
        [searchQuery])

    console.log("results for", searchQuery, "FOUND!", results)

    // const resultsArr = getResultsArray(foundPosts.data.children)

    // return (
    //     <main className={styles.mainContainer}>
    //         <h1 className={styles.galleryTitle}>Top Results Found</h1>
    //         {/* <div className={styles.galleryContainer}>
    //             {resultsArr.map(rslt =>
    //                 <Card result={rslt} />
    //             )}

    //         </div> */}
    //     </main>
    // );
};

export default Found;
