import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';
import AppButton from './components/AppButton';
import QuestionCard from './components/QuestionCard';
import AppSpinner from './components/Spinner';
import { Difficulty, totalQuestions } from './const';
import { getQuestionList } from './services/fetchQuestions';
import { IQuestion, IUserAnswer } from './types';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestion] = useState<IQuestion[]>([]);
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

  const startQuizGame = (): void => {
    setStartQuiz(true);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (gameOver) return;

    const choosenAnswer = e.currentTarget.innerText;
    const correct = questions[questionNumber]?.correct_answer === choosenAnswer;

    //정답이면 스코어 +1
    if (correct) setScore((prev) => prev + 1);
    const answerObject = {
      question: questions[questionNumber]?.question,
      answer: choosenAnswer,
      correct: correct,
      correctAnswer: questions[questionNumber].correct_answer,
    };
    setUserAnswer((prev) => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    if (nextQuestion === totalQuestions) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestion);
    }
  };

  const replayQuiz = () => {
    setStartQuiz(false);
    setQuestionNumber(0);
    setScore(0);
    setGameOver(false);
    setUserAnswer([]);
    setLoading(true);
  };

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
        <div className='greeting-box'>
          <Box boxShadow='base' p='6' rounded='md' bg='white' maxW='560px'>
            <Heading as='h2' size='lg' mb={2}>
              퀴즈앱인데 영어를 알아야 해요 <br />
              API가 그래요!
            </Heading>
            <p>참이나 거짓이에요! {totalQuestions}개의 질문이 있어요!</p>
            <AppButton
              colorScheme='purple'
              variant='solid'
              onClick={startQuizGame}
              value='시작!'
              width='full'
            />
          </Box>
        </div>
      ) : null}

      {/* 시작 */}
      {!loading && !gameOver && startQuiz && (
        <Box boxShadow='base' p='6' rounded='md' bg='white' maxW='560px'>
          <QuestionCard
            questions={questions[questionNumber].question}
            category={questions[questionNumber].category}
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
            width='full'
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
