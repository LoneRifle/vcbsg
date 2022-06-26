import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div>This site is powered by <a href="https://www.netlify.com/">Netlify</a></div>
      </footer>
    </>
  )
}
