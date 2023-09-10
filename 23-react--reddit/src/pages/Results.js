import { useLocation } from 'react-router-dom';

import Card from '../components/Card';
import styles from "./Results.module.css"


const Results = ({ selectedSubReddit, selectedCriterion }) => {

    const location = useLocation()
    const searchQuery = location.state.searchQuery
    const postsArray = location.state.postsArray

    let displayedCriterion = ""
    let displayedSubtitle = ""

    // If redirected from searchBar => displaying results from search
    if (searchQuery) {
        displayedCriterion = `Found Results for "${searchQuery}"`
        displayedSubtitle = "sorted by relevance"
    }

    // If not => displaying listing by criterion
    else {
        displayedCriterion = selectedCriterion.charAt(0).toUpperCase() + selectedCriterion.slice(1)

        if (selectedCriterion === "best") {
            displayedSubtitle = `Since app is userless API request to /best would return the same results as /hot. \n
        Hence here app is getting the top results of all times instead.`
        }
        else if (selectedCriterion === "top") {
            displayedSubtitle = `Today's Top Posts`
        }
        else if (selectedCriterion === "hot") {
            displayedSubtitle = `New and Popular posts`
        }
        else if (selectedCriterion === "controversial") {
            displayedSubtitle = `This Week's Most Controverial Posts`
        }
    }

    return (
        <main className={styles.mainContainer}>

            <div className={styles.galleryTitle}>
                <span className={styles.galleryCriterion}>{displayedCriterion}
                    &nbsp;in&nbsp;
                </span>
                <img src={selectedSubReddit.icon} alt={selectedSubReddit.name} className={styles.galleryIcon}></img>
                <span className={styles.galleryRedditName}>r/{selectedSubReddit.name}</span>
            </div>

            <h2 className={styles.gallerySubtitle}>{displayedSubtitle}</h2>

            <div className={styles.galleryContainer}>
                {postsArray.map(rslt =>
                    <Card result={rslt} key={rslt.id} />
                )}

            </div>
        </main>
    );
};

export default Results;
