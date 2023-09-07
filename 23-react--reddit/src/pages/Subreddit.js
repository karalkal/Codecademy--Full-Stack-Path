import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import styles from "./GalleryContainer.module.css"

import createSimplifiedPostsArray from '../utils/createSimplifiedPostsArray';
import { fetchPostsPerSubRettit } from '../api/api';


const Subreddit = ({ accessToken }) => {
    const [postsArray, setpostsArray] = useState([])

    const location = useLocation()

    let { selectedSubReddit, selectedCriterion } = location.state

    //fetch results
    useEffect(() => {
        async function getResults() {
            console.log("starting search for:", selectedSubReddit, "criterion", selectedCriterion)
            let foundPosts = await fetchPostsPerSubRettit(accessToken, selectedSubReddit, selectedCriterion)

            let res = createSimplifiedPostsArray(foundPosts.data.children)
            setpostsArray(res)
        }

        getResults();       // CALL THE FUNCTION
        // cleanup?
    }
        , [selectedSubReddit, selectedCriterion])

    let subtitle = ""
    if (selectedCriterion === "best") {
        subtitle = `Actually top results of all times for ${selectedSubReddit}`
    }
    else if (selectedCriterion === "top") {
        subtitle = `Today's Top Posts in in ${selectedSubReddit}`
    }
    else if (selectedCriterion === "hot") {
        subtitle = `New and Popular posts in ${selectedSubReddit}`
    }
    else if (selectedCriterion === "controversial") {
        subtitle = `This Week's Most Controverial Posts in ${selectedSubReddit}`
    }


    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.galleryTitle}>{selectedCriterion.charAt(0).toUpperCase() + selectedCriterion.slice(1)}</h1>
            <h3 className={styles.gallerySubtitle}>{subtitle}</h3>
            <div className={styles.galleryContainer}>
                {postsArray.map(rslt =>
                    <Card result={rslt} key={rslt.id} />
                )}

            </div>
        </main>
    );

};

export default Subreddit;
