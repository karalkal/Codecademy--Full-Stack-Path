import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'


export default function Header({ authEndpoint, clientId, responseType, randomStr, redirectURI, duration, scopeStr, hasGrantedAccess }) {
    console.log(hasGrantedAccess)
    return <header id={styles.header}>
        <div>
            <img src='logo.svg' className={styles["logo"]} alt="logo" />
            <h1>Mini Reddit</h1>
        </div>
        <nav>
            <NavLink to={`${authEndpoint}?client_id=${clientId}&response_type=${responseType}&state=${randomStr}&redirect_uri=${redirectURI}&duration=${duration}&scope=${scopeStr}`}
                className={`${styles.firstRowItem} ${styles.navLink}`}>
                {!hasGrantedAccess ? "Grant" : "Remove"} User Auth
            </NavLink>

            <NavLink to="appauth"
                className={`${styles.firstRowItem} ${styles.navLink}`}>
                App Only OAuth (userless)
            </NavLink>
            {/* depending on state of hasGrantedAccess display links */}
            {!hasGrantedAccess &&
                <NavLink to="/"
                    className={`${styles.secondRowItem} ${styles.navLink}`}>
                    Home
                </NavLink>
            }
            {hasGrantedAccess &&
                <>
                    <NavLink to="best"
                        className={`${styles.secondRowItem} ${styles.navLink}`}>
                        Best
                    </NavLink>

                    <NavLink to="search"
                        className={`${styles.secondRowItem} ${styles.navLink}`}>
                        Search
                    </NavLink>
                </>
            }
        </nav>
    </header>
}
