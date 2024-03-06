import Link from "next/link";
import Logo from "./logo";
import classes from './MainNavigation.module.css'

const MainNavigation = () => {
  return (
      <header className={classes.navbar}>
        <Link href={'/'} className={classes.logo}>
            <Logo/>
        </Link>
        <nav>
          <ul>
            <li>
              <Link href={'/posts'}>Factions</Link>
            </li>
            <li>
              <Link href={'/contact'}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default MainNavigation;