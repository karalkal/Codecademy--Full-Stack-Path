import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'


export default function Header({ authEndpoint, clientId, responseType, randomStr, redirectURI, duration, scopeStr, hasGrantedAccess }) {
    return <header id={styles.header}>
        <div>
            <img src='logo.svg' className={styles["logo"]} alt="logo" />
            <h1>Mini Reddit</h1>
        </div>
        <nav>

            <NavLink to="app-auth"
                className={`${styles.firstRowItem} ${styles.navLink}`}>
                First
            </NavLink>


            <NavLink to="app-auth"
                className={`${styles.firstRowItem} ${styles.navLink}`}>
                Second
            </NavLink>

            <NavLink to="/"
                className={`${styles.secondRowItem} ${styles.navLink}`}>
                Home
            </NavLink>

            <NavLink to="best"
                className={`${styles.secondRowItem} ${styles.navLink}`}>
                Best
            </NavLink>

            <NavLink to="search"
                className={`${styles.secondRowItem} ${styles.navLink}`}>
                Search
            </NavLink>


        </nav>
    </header>
}
