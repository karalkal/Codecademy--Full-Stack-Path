import styles from './Header.module.css'
import Button from './Button'


export default function Header() {
    return <header id={styles.header}>
        <img src='logo.svg' className={styles["logo"]} alt="logo" />
        <h1>Mini Reddit</h1>
        <Button>Log in</Button>
    </header>
}
