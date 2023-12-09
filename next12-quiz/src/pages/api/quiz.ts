import { NextApiRequest, NextApiResponse } from 'next';

const questionAnswers = [
  {
    id: 1,
    question: '과일이 아닌 것은?',
    options: ['사과', '망고', '바나나', '자동차'],
    answer: '자동차',
  },
  {
    id: 2,
    question: '2 + 2 ?',
    options: ['1', '2', '3', '4'],
    answer: '4',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page } = req.query as { page: string };

    if (!page) {
      res.send(questionAnswers);
    }
    let pageToNum = parseInt(page);

    const quiz = questionAnswers[pageToNum];
    const lastPage = questionAnswers.length - 1;
    const numOfQuestions = questionAnswers.length;

    if (pageToNum === 0) {
      res.send({
        prev: false,
        next: true,
        page,
        quiz,
        total: numOfQuestions,
      });
    } else if (pageToNum === lastPage) {
      res.send({
        prev: true,
        next: false,
        page,
        quiz,
        total: numOfQuestions,
      });
    } else {
      res.send({
        prev: true,
        next: true,
        page,
        quiz,
        total: numOfQuestions,
      });
    }
  } catch (error) {
    res.status(500);
  }
}
