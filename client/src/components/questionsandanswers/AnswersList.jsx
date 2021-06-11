/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import Answer from './Answer';

const AnswersList = ({ answers }) => {
  const [answerView, setAnswerView] = useState(true);

  const handleMoreAnswers = () => {
    setAnswerView(!answerView);
  };

  const answerList = answerView && answers ? answers.slice(0, 2) : answers;
  const moreAnswers = answerView ? 'more answers' : 'less answers';

  return (
    <div>
      <div>
        {answers
          ? Object.keys(answerList).map((keys) => (<Answer key={answerList[keys][1].id} answerBody={answerList[keys][1]} />))
          : null}
      </div>
      <button className="more-answers" onClick={handleMoreAnswers} type="button">
        {moreAnswers}
      </button>
    </div>

  );
};

export default AnswersList;
