import SearchBar from './SearchBar'
import styles from './Header.module.css'
import { Link, NavLink } from 'react-router-dom'


export default function Header({ selectedSubReddit, setSelectedCriterion }) {
    console.log(selectedSubReddit, setSelectedCriterion)
    return <header id={styles.header}>
        <NavLink to="/">
            <img src='logo.svg' className={styles["logo"]} alt="logo" />
            <h1>Mini Reddit</h1>
        </NavLink>

        <nav>
            <p className={styles.menuAboutRow}>{selectedSubReddit}</p>

            <div className={`${styles.menuSearchRow}`}>
                <SearchBar />
            </div>

            <div className={styles.menuButtonsRow}>
                <NavLink to="/"
                    className={styles.navLink} on>Home</NavLink>
                <button onClick={() => setSelectedCriterion("best")}
                    className={styles.navLink} > Best</button>
                <button onClick={() => setSelectedCriterion("top")}
                    className={styles.navLink}>Top</button>
                <button onClick={() => setSelectedCriterion("hot")}
                    className={styles.navLink}>Hot</button>
                <button onClick={() => setSelectedCriterion("controversial")}
                    className={styles.navLink}>Contro</button>
                <Link to={"https://github.com/karalkal/Codecademy-Front-End/tree/main/23-react--reddit"} className={styles.navLink} target='_blank' id={styles.aboutBtn}>
                    About
                </Link>
            </div>
        </nav>
    </header >
}
