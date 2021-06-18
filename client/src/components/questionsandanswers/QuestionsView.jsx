/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useContext } from 'react';
import Search from './Search';
import Question from './Question';
import QuestionsAndAnswers from './QuestionsAndAnswers';
import AddQuestion from './AddQuestion';
import ThemeContext from '../context/Theme';
// import AddQuestionForm from './AddQuestionForm';
// import Questions from './questionsandanswers/Questions.jsx';
const QuestionsView = ({ questionInfo, Name }) => {
  // const info = questionInfo.questions;
  const [info, setInfo] = useState(questionInfo.questions);
  const [questionView, setQuestionView] = useState(true);
  const [search, setSearch] = useState('');
  const { themeMode } = useContext(ThemeContext);

  const questionList = () => {
    if (!info) {
      return [];
    }
    if (search.length >= 3) {
      const searchedList = info.results.filter((question) => question.question_body.toLowerCase().includes(search.toLowerCase()));
      return searchedList;
    }

    if (questionView) {
      return info.results.slice(0, 4);
    }

    return info.results;
  };

  const questionInfoObj = questionList();

  const handleMoreQuestions = () => {
    setQuestionView(!questionView);
  };
  const searchQuestions = (input) => {
    setSearch(input);
  };

  const totalQs = `See Remaining ${questionInfo.questions.results.length - 4} Questions`
  const moreQuestions = questionView ? totalQs : 'Collapse Questions';

  return (
    <div id="QA-view" className={`${themeMode === 'Light' ? 'text-muted' : 'text-muted-light'}`}>
      <div id="inner-QAview" className={`${themeMode === 'Light' ? 'bg-light border-light' : 'bg-dark border-dark text-dark'}`}>
        <div className="QA-header-search">
      <h1 id="QA-header" className={`${themeMode === 'Light' ? 'text-muted' : 'text-muted-light'}`} >Questions & Answers</h1>
          <Search searchQuestions={searchQuestions} />
        </div>
        <div id="question-cards">
          {questionInfoObj.map((question) => <Question key={question.question_id} question={question} />)}
        </div>
        { (questionInfo.questions.results.length > 4) ?
        <button className="add-more-questions py-3 w-50 mx-auto my-2" onClick={handleMoreQuestions}>
            {moreQuestions}
        </button> : null}
            <AddQuestion questionInfo={questionInfo.questions} Name={Name} />
      </div>
    </div>
  );
};

export default QuestionsView;
