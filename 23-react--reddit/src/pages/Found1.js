import Card from '../components/Card';
import styles from "./Found.module.css"

const Found = ({ postsArray }) => {  
    return (
        <main className={styles.mainContainer}>

            {/* <h1 className={styles.galleryTitle}>Top results for "{searchQuery}" in {selectedSubReddit.name}</h1> */}

            <h2 className={styles.gallerySubtitle}> (sorted by relevance)</h2>

            <div className={styles.galleryContainer}>

                {postsArray.map(rslt =>
                    <Card result={rslt} key={rslt.id} />
                )}

            </div>
        </main>
    );
};


export default Found;
