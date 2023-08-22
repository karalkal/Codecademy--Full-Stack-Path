import styles from './Header.module.css'
import Button from './Button'
import { NavLink } from 'react-router-dom'


export default function Header({ authEndpoint, clientId, responseType, randomStr, redirectURI, duration, scopeStr, hasGrantedAccess }) {
    return <header id={styles.header}>
        <img src='logo.svg' className={styles["logo"]} alt="logo" />
        <h1>Mini Reddit</h1>
        <nav>
            <NavLink to="/">
                <Button>Random</Button>
            </NavLink>

            <NavLink to="search">
                <Button>Search</Button>
            </NavLink>

            <NavLink to={`${authEndpoint}?client_id=${clientId}&response_type=${responseType}&state=${randomStr}&redirect_uri=${redirectURI}&duration=${duration}&scope=${scopeStr}`}>
                <Button>
                    {!hasGrantedAccess ? "Grant" : "Remove"} Access
                </Button>
            </NavLink>
        </nav>
    </header>
}
