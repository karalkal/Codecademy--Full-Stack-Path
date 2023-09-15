import { useLocation, useParams } from 'react-router-dom';

import Card from '../components/Card';
import styles from "./Results.module.css"
import generateResultsHeaderData from '../utils/generateResultsHeaderData';


const Results = ({ selectedSubReddit, selectedCriterion }) => {
    const params = useParams()
    console.log(params)

    const location = useLocation()
    const searchQuery = location.state.searchQuery
    const postsArray = location.state.postsArray

    let {displayedCriterion, displayedSubtitle} = generateResultsHeaderData(selectedCriterion, searchQuery)
    

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
