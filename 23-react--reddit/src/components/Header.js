import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'


export default function Header({ authEndpoint, clientId, responseType, randomStr, redirectURI, duration, scopeStr, hasGrantedAccess }) {
    return <header id={styles.header}>
        <div>
            <img src='logo.svg' className={styles["logo"]} alt="logo" />
            <h1>Mini Reddit</h1>
        </div>
        <nav>

            <NavLink
                className={`${styles.firstRowItem} ${styles.navLink}`}>
                First
            </NavLink>


            <NavLink
                className={`${styles.firstRowItem} ${styles.navLink}`}>
                Second
            </NavLink>

            <NavLink to="best"
                className={`${styles.secondRowItem} ${styles.navLink}`}>
                Best
            </NavLink>

            <NavLink to="top"
                className={`${styles.secondRowItem} ${styles.navLink}`}>
                Top
            </NavLink>

            <NavLink to="hot"
                className={`${styles.secondRowItem} ${styles.navLink}`}>
                Hot
            </NavLink>

            <NavLink to="controversial"
                className={`${styles.secondRowItem} ${styles.navLink}`}>
                Controversial
            </NavLink>


        </nav>
    </header>
}
