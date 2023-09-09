import SearchBar from './SearchBar'
import styles from './Header.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'


export default function Header({ selectedSubReddit, selectedCriterion, setSelectedCriterion }) {
    const navigate = useNavigate()
    function selectionHandler(clickedCrit) {
        setSelectedCriterion(clickedCrit)
        // selectedCriterion MUST now be === clickedCrit, not ideal implementation
        navigate(`${selectedSubReddit.name}/${clickedCrit}`)
    }

    return <header id={styles.header}>
        <NavLink to="/">
            <img src='logo.svg' className={styles["logo"]} alt="logo" />
            <h1>Mini Reddit</h1>
        </NavLink>

        <nav>
            <div className={`${styles.menuSearchRow}`}>
                <SearchBar selectedSubReddit={selectedSubReddit} />
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
