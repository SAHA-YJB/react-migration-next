import { useEffect, useState } from 'react';
import './App.css';
import { IQuestion, IUserAnswer } from './types';
import { getQuestionList } from './services/fetchQuestions';
import { Difficulty, totalQuestions } from './const';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [question, setQuestion] = useState<IQuestion[]>([]);
  const [userAnswer, setUserAnswer] = useState<IUserAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      const questionListing = await getQuestionList(
        totalQuestions,
        Difficulty.EASY
      );
      setQuestion(questionListing);
      setLoading(false);
    };
    fetchQuestion();
  }, []);
  return <></>;
}
export default App;
