import styles from './Header.module.css'
import Button from './Button'


export default function Header({ authEndpoint, clientId, responseType, randomStr, redirectURI, duration, scopeStr, hasGrantedAccess }) {
    return <header id={styles.header}>
        <img src='logo.svg' className={styles["logo"]} alt="logo" />
        <h1>Mini Reddit</h1>
        <Button>
            <a href={`${authEndpoint}?client_id=${clientId}&response_type=${responseType}&state=${randomStr}&redirect_uri=${redirectURI}&duration=${duration}&scope=${scopeStr}`}>
                {!hasGrantedAccess ? "Grant" : "Remove"} Access
            </a>
        </Button>
    </header>
}
