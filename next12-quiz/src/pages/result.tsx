import { TQuiz, TSavedAnswer } from '@/types/quiz';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

const Result = () => {
  //윈도우가 언디파인드가 아닐때 로컬에 답들을 가져오고 아니라면 빈객체를 가져온다.
  const getAnswers =
    (typeof window !== 'undefined' && localStorage.getItem('quiz')) ||
    JSON.stringify({});
  const answers: TSavedAnswer = JSON.parse(getAnswers);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(`./api/quiz`, fetcher);

  if (error) return <div>에러가 발생했어요!</div>;
  if (!data) return <div>로딩중...</div>;

  let correct = 0;
  if (data) {
    data.map((quiz: TQuiz) => {
      if (answers[quiz.id] === quiz.answer) {
        correct += 1;
      }
    });
  }

  return (
    <>
      <div>
        <Link href='/'>다시시작하기</Link>
      </div>
      <h2>
        {correct}개의 문제를 맞췄습니다.
        {correct > (data.length / 100) * 70
          ? '통과입니다!'
          : '다시 도전해보세요!'}
      </h2>
      <br />
      {data.map((quiz: TQuiz) => (
        <div key={quiz.id}>
          <div>
            {' '}
            <p>{quiz.question}</p>
          </div>
          <ul>
            {quiz.options.map((option: string, i: number) => (
              <li key={i}>
                {quiz.answer === option ? (
                  quiz.answer === answers[quiz.id] ? (
                    <span>{option}: 정답</span>
                  ) : (
                    <span>{option}</span>
                  )
                ) : answers[quiz.id] === option ? (
                  <span>{option}: 오답</span>
                ) : (
                  <span>{option}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Result;
