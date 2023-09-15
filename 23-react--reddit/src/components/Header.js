import { Link, NavLink, useNavigate } from 'react-router-dom'

import styles from './Header.module.css'
import SearchBar from './SearchBar'
import blueLogo from "../misc/redditBluelogo.png";
import createSimplifiedPostsArray from '../utils/createSimplifiedPostsArray';
import { fetchPostsFromSubreddit } from '../api/api';


export default function Header({ accessToken, selectedSubReddit, setSelectedCriterion }) {

    const navigate = useNavigate()

    async function selectionHandler(clickedCrit) {
        let fetchedResults = await fetchPostsFromSubreddit(accessToken, selectedSubReddit.url, clickedCrit)
        let postsArray = createSimplifiedPostsArray(fetchedResults.data.children)

        setSelectedCriterion(clickedCrit)
        localStorage.setItem("crit", JSON.stringify(clickedCrit))

        const pathToNavigateTo = `${selectedSubReddit.name}/${clickedCrit}`

        navigate(pathToNavigateTo, { state: { postsArray } })
        // navigate("results", { state: { postsArray } })
    }


    return <header id={styles.header}>
        <NavLink to="/">
            <img src={blueLogo} className={styles["logo"]} alt="blue&black reddit logo" />
            <h1>Mini Reddit</h1>
        </NavLink>

        <nav>
            <div className={`${styles.menuSearchRow}`}>
                <SearchBar
                    accessToken={accessToken}
                    selectedSubReddit={selectedSubReddit}
                    setSelectedCriterion={setSelectedCriterion}
                />
            </div>

            <div className={styles.menuButtonsRow}>
                <NavLink to="/">Home</NavLink>
                <button onClick={() => selectionHandler("best")}>Best</button>
                <button onClick={() => selectionHandler("top")}>Top</button>
                <button onClick={() => selectionHandler("hot")}>Hot</button>
                <button onClick={() => selectionHandler("controversial")}>Contro</button>
                <Link to={"https://github.com/karalkal/Codecademy-Front-End/tree/main/23-react--reddit"} target='_blank' id={styles.aboutBtn}>
                    About
                </Link>
            </div>
        </nav>
    </header >
}
