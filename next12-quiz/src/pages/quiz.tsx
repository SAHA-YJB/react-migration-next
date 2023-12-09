import React, { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Quiz = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, error } = useSWR(`/api/quiz?page=${pageIndex}`, fetcher);

  if (error) return <div>에러가 발생했어요!</div>;
  if (!data) return <div>로딩중...</div>;
  const { quiz, total, next, prev, page } = data;

  return <div>quiz</div>;
};

export default Quiz;
