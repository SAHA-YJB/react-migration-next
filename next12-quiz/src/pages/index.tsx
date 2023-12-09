import { Inter } from 'next/font/google';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <p className={styles.description}>Pages Quiz</p>
        <p className={styles.description}>안녕하세요</p>
        <Link className={styles.startBtn} href='/quiz'>
          시작하기
        </Link>
      </div>
    </>
  );
}
