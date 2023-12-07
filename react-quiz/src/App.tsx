import { useEffect, useState } from 'react';
import './App.css';
import { IQuestion, IUserAnswer } from './types';
import { getQuestionList } from './services/fetchQuestions';
import { Difficulty, totalQuestions } from './const';
import AppSpinner from './components/Spinner';
import { Box, Heading } from '@chakra-ui/react';
import AppButton from './components/AppButton';
import QuestionCard from './components/QuestionCard';

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
  const checkAnswer = () => {};
  const nextQuestion = () => {};
  const replayQuiz = () => {};

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

      {/* 시작 */}
      {!loading && !gameOver && startQuiz && (
        <Box boxShadow='base' p='6' rounded='md' bg='white' maxW='560px'>
          <QuestionCard
            questions={question[questionNumber].question}
            category={question[questionNumber].category}
            totalQuestions={totalQuestions}
            questionNumber={questionNumber}
            checkAnswer={checkAnswer}
          />
          <AppButton
            disabled={
              userAnswer.length === questionNumber + 1 &&
              questionNumber !== totalQuestions
                ? false
                : true
            }
            colorScheme='purple'
            variant='solid'
            onClick={nextQuestion}
            value='다음!'
            className='next-button'
          />
        </Box>
      )}

      {/* 오버 */}
      {gameOver && (
        <>
          <Box boxShadow='base' p='6' rounded='md' bg='white' maxW='560px'>
            <Box mb={4}>
              <Box as='h3' fontWeight='bold' fontSize='4xl'>
                게임 끝!
              </Box>
              <Box as='h3' fontSize='xl'>
                점수: {score}
              </Box>
            </Box>
            {userAnswer.map((answer, index) => (
              <Box key={index}>
                <div className='answer-list'>
                  <Box fontSize='md' fontWeight='bold'>
                    Q.
                    <p dangerouslySetInnerHTML={{ __html: answer.question }} />
                  </Box>
                  <ul>
                    <li>You Answer: {answer.answer}</li>
                    <li>Correct Answer: {answer.correctAnswer}</li>
                  </ul>
                </div>
              </Box>
            ))}
            <AppButton
              colorScheme='purple'
              variant='solid'
              onClick={replayQuiz}
              value='다시 시작!'
              width='full'
            />
          </Box>
        </>
      )}
    </main>
  );
}
export default App;
