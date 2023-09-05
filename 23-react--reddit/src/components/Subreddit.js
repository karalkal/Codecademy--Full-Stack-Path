import { useEffect, useState } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import Card from './Card';
import styles from "./GalleryContainer.module.css"
import getResultsArray from '../utils/getResultsArray';
import { fetchPostsPerSubRettit } from '../api/api';


const Subreddit = ({ accessToken }) => {
    const [resultsArr, setResultsArr] = useState([])

    const location = useLocation()

    let { selectedSubReddit, selectedCriterion } = location.state

    //fetch results
    useEffect(() => {
        async function getResults() {
            console.log("starting search for:", selectedSubReddit, "criterion", selectedCriterion)
            let foundPosts = await fetchPostsPerSubRettit(accessToken, selectedSubReddit, selectedCriterion)

            let kur = getResultsArray(foundPosts.data.children)
            setResultsArr(kur)
        }

        getResults();       // CALL THE FUNCTION
        // cleanup?
    }
        , [selectedSubReddit, selectedCriterion])

    if (!resultsArr) {
        return <h1>"Loading data from API..."</h1>
    }

    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.galleryTitle}>{selectedCriterion.toUpperCase()} posts of {selectedSubReddit}</h1>
            <h3 className={styles.gallerySubtitle}> (Actual endpoint is '/top?limit=44&t=all'.
                Since app is userless /best returns the same as /hot)</h3>
            <div className={styles.galleryContainer}>
                {resultsArr.map(rslt =>
                    <Card result={rslt} />
                )}

            </div>
        </main>
    );

};

export default Subreddit;
