import SearchBar from './SearchBar'
import styles from './Header.module.css'
import { Link, NavLink } from 'react-router-dom'


export default function Header({ selectedSubReddit, setSelectedCriterion }) {
    return <header id={styles.header}>
        <NavLink to="/">
            <img src='logo.svg' className={styles["logo"]} alt="logo" />
            <h1>Mini Reddit</h1>
        </NavLink>

        <nav>
            <div className={`${styles.menuSearchRow}`}>
                <SearchBar />
            </div>

            <div className={styles.menuButtonsRow}>
                <NavLink to="/">Home</NavLink>
                <button onClick={() => setSelectedCriterion("best")}>Best</button>
                <button onClick={() => setSelectedCriterion("top")}>Top</button>
                <button onClick={() => setSelectedCriterion("hot")}>Hot</button>
                <button onClick={() => setSelectedCriterion("controversial")}>Contro</button>
                <Link to={"https://github.com/karalkal/Codecademy-Front-End/tree/main/23-react--reddit"} target='_blank' id={styles.aboutBtn}>
                    About
                </Link>
            </div>
        </nav>
    </header >
}
