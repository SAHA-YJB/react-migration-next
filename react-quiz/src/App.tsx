import { useEffect, useState } from 'react';
import './App.css';
import { IQuestion, IUserAnswer } from './types';
import { getQuestionList } from './services/fetchQuestions';
import { Difficulty, totalQuestions } from './const';
import AppSpinner from './components/Spinner';
import { Box, Heading } from '@chakra-ui/react';
import AppButton from './components/AppButton';

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

  const startQuizGame = () => {};

  return (
    <main>
      {loading && (
        <div className='app-spinner'>
          <AppSpinner
            speed='0.65s'
            emptyColor='gray.200'
            color='purple'
            size='lg'
            thickness='4px'
          />
        </div>
      )}

      {userAnswer.length === questionNumber &&
      !gameOver &&
      !loading &&
      !startQuiz ? (
        <div>
          <Box boxShadow='base' p='6' rounded='md' bg='white' maxW='560px'>
            <Heading as='h2' size='lg' mb={2}>
              퀴즈앱인데 영어를 알아야 해요 API가 그래요!
            </Heading>
            <p>참이나 거짓이에요! {totalQuestions}개의 질문이 있어요!</p>
            <AppButton
              colorScheme='purple'
              variant='solid'
              onClick={startQuizGame}
              value='시작!'
            />
          </Box>
        </div>
      ) : null}
    </main>
  );
}
export default App;
