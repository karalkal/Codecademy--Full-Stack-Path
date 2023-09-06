import SearchBar from './SearchBar'
import styles from './Header.module.css'
import { Link, NavLink } from 'react-router-dom'


export default function Header() {
    // console.log(props)
    return <header id={styles.header}>
        <NavLink to="/">
            <img src='logo.svg' className={styles["logo"]} alt="logo" />
            <h1>Mini Reddit</h1>
        </NavLink>

        <nav>
            <p className={styles.menuAboutRow}>Results from all Subreddits</p>

            <div className={`${styles.menuSearchRow}`}>
                <SearchBar />
            </div>

            <div className={styles.menuButtonsRow}>
                <NavLink to="/"
                    className={styles.navLink}>Home</NavLink>
                <NavLink to="best"
                    className={styles.navLink}>Best</NavLink>
                <NavLink to="top"
                    className={styles.navLink}>Top</NavLink>
                <NavLink to="hot"
                    className={styles.navLink}>Hot</NavLink>
                <NavLink to="controversial"
                    className={styles.navLink}>Contro</NavLink>
                <Link to={"https://github.com/karalkal/Codecademy-Front-End/tree/main/23-react--reddit"} className={styles.navLink} target='_blank' id={styles.aboutBtn}>
                    About
                </Link>
            </div>
        </nav>
    </header>
}
