import { TSavedAnswer } from '@/types/quiz';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import styles from '@/styles/Quiz.module.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Quiz = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [answerd, setAnswerd] = useState<TSavedAnswer>({});
  const { data, error } = useSWR(`/api/quiz?page=${pageIndex}`, fetcher);

  if (error) return <div>에러가 발생했어요!</div>;
  if (!data) return <div>로딩중...</div>;
  const { quiz, total, next, prev, page } = data;

  const addAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const latestAnswers = { ...answerd, [name]: value };
    setAnswerd(latestAnswers);
    localStorage.setItem('quiz', JSON.stringify(latestAnswers));
  };

  return (
    <>
      <div className={styles.info}>
        <p>
          {parseInt(page) + 1} / {total}
        </p>
      </div>
      <div>
        <div>
          <p>{quiz.question}</p>
        </div>
        <ul>
          {quiz.options.map((option: string, index: number) => (
            <li key={index} className={styles.option}>
              <input
                type='radio'
                name={quiz.id.toString()}
                onChange={(e) => addAnswer(e)}
                value={option}
                checked={answerd[quiz.id] === option}
              />
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.navBtns}>
        {prev ? (
          <button onClick={() => setPageIndex(pageIndex - 1)}>이전 문제</button>
        ) : (
          <Link href='/'>취소</Link>
        )}
        {next ? (
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={answerd[quiz.id] === undefined}
            className={
              answerd[quiz.id] === undefined ? 'disabledBtn' : 'activeBtn'
            }
          >
            다음 문제
          </button>
        ) : (
          answerd[quiz.id] !== undefined && <Link href='/result'>완료</Link>
        )}
      </div>
    </>
  );
};

export default Quiz;
