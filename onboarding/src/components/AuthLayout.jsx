import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./styles/auth.module.css";

export default function AuthLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <div className={styles.brand}>
          <NavLink to="/" className={styles.logoLink}>
            <span className={styles.logoText}>MultyDocs</span>
          </NavLink>
        </div>
        <div className={styles.navActions}>
          <NavLink to="/login" className={styles.navLink} end>
            Sign in
          </NavLink>
          <NavLink to="/register" className={styles.navLink}>
            Create account
          </NavLink>
        </div>
      </nav>

      <main className={styles.page}>
        <div className={styles.back} aria-hidden="true">
          {children}
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Built for MultyDocs &middot; <a href="/" className={styles.footerLink}>Back to home</a>
        </p>
      </footer>
    </div>
  );
}
