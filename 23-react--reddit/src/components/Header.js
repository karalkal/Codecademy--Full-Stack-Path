import styles from './Header.module.css'
import Button from './Button'
import { NavLink } from 'react-router-dom'


export default function Header({ authEndpoint, clientId, responseType, randomStr, redirectURI, duration, scopeStr, hasGrantedAccess }) {
    return <header id={styles.header}>
        <div>
            <img src='logo.svg' className={styles["logo"]} alt="logo" />
            <h1>Mini Reddit</h1>
        </div>
        <nav>
            <NavLink to={`${authEndpoint}?client_id=${clientId}&response_type=${responseType}&state=${randomStr}&redirect_uri=${redirectURI}&duration=${duration}&scope=${scopeStr}`}
                className={styles["first-row-item"]}>
                <Button                    >
                    {!hasGrantedAccess ? "Grant" : "Remove"} User Auth
                </Button>
            </NavLink>

            <NavLink to="kur"
                className={styles["first-row-item"]}>
                <Button>
                    App Only OAuth (userless)
                </Button>
            </NavLink>

            <NavLink to="/"
                className={styles["second-row-item"]}>
                <Button>Home</Button>
            </NavLink>

            <NavLink to="random"
                className={styles["second-row-item"]}>
                <Button>Random</Button>
            </NavLink>

            <NavLink to="search"
                className={styles["second-row-item"]}>
                <Button>Search</Button>
            </NavLink>
        </nav>
    </header>
}
