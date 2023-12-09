import Question from '@/components/Question';
import { getQustions } from '@/utils/functions';

const QuestionPage = () => {
  const questions = getQustions();

  return (
    <div className='flex flex-col space-y-4 md:space-y-8 p-4 lg:p-8'>
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          withId={false}
          checkEnabled={true}
        />
      ))}
    </div>
  );
};

export default QuestionPage;
