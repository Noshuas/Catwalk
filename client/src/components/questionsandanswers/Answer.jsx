/* eslint-disable import/named */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useState } from 'react';
import PropTypes from 'prop-types';
import Questions from './Questions';
import { AddAnswer } from './AddAnswer';
import Connect from '../Connect';

const Answer = ({ answerBody, question }) => {
  const dateFormat = (inputTime) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December',
    ];

    const today = new Date(inputTime);
    const date = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    return date;
  };

  const [helpfulness, setHelpfulness] = useState(false);
  const [addHelpful, setAddHelpful] = useState(answerBody.helpfulness);

  const addOneHelp = () => {
    if (helpfulness === false) {
      Connect.putHelpfulnessAnswers(answerBody.id)
        .then((response) => {
          if (response.status === 200) {
            setAddHelpful(addHelpful + 1);
            setHelpfulness(true);
          }
        });
    }
  };

  const seller = answerBody.answerer_name === 'seller' ? 'sellerBold' : 'answer-user';

  return (
    <div id="answers">
      <p className="answer-body">
        A:
        {' '}
        {answerBody.body}
      </p>
      <div className={seller}>
        {answerBody.answerer_name}
        {' '}
        (user)
        {' '}
        <div className="answer-date seller">
          {dateFormat(answerBody.date)}
        </div>
      </div>
      <div id="answer-photos" /*onWheel={onWheel}*/>
        {answerBody.photos.map((images, idx) =>
          <img key={idx} className="answer-photo" src={images} alt="This is an answer image" />
          )}
      </div>
      <div className="helpful">
        <div>
          {addHelpful}
          {' | '}
          <button onClick={() => { addOneHelp(); }} className="answer-helpfulness-btn" type="button">Helpful </button>
          {' '}
        </div>
      </div>
    </div>
  );
};

Answer.propTypes = {
  answerBody: PropTypes.object.isRequired,
};

export default Answer;
