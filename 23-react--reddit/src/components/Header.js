import Form from './Form'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'


export default function Header({ setSearchTerm }) {
    // console.log(props)
    return <header id={styles.header}>
        <div>
            <img src='logo.svg' className={styles["logo"]} alt="logo" />
            <h1>Mini Reddit</h1>
        </div>

        <nav>
            <div className={`${styles.firstRowItem}`}>
                <Form className={`${styles.firstRowItem}`} setSearchTerm={setSearchTerm} />
            </div>

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
