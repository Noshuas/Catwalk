/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Connect from '../Connect';
import ProductName from '../context/ProductName';

const AddQuestionForm = ({ questionInfo, closeModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [charCountName, setCharCountName] = useState(60);
  const [charCountEmail, setCharCountEmail] = useState(60);
  const [charCountBody, setCharCountBody] = useState(1000);
  const { productName } = useContext(ProductName);

  const handleName = (e) => {
    setName(e.target.value);
    setCharCountName(60 - e.target.value.length);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setCharCountEmail(60 - e.target.value.length);
  };

  const handleBody = (e) => {
    setBody(e.target.value);
    setCharCountBody(1000 - e.target.value.length);
  };

  const handleQuestionSubmit = () => {
      const productId = questionInfo.product_id;
      Connect.postAddQuestion({
        body, name, email, product_id: productId,
      })
        .then((response) => {
          console.log(response);
        });
      closeModal();
  };

  return (
    <div id="Question-form-main">
      <h3>Submit Your Question</h3>
      <h2>{productName}</h2>
      <div className="Q-name-email">
        <div className="add-question-container-name">
          <div>
            <label>Name: </label>
            <input
              className="add-question-name"
              placeholder="Example: jackson11!"
              type="text"
              value={name}
              maxLength="60"
              onChange={handleName}
            />
          </div>
          <div>
            <div className="question-charCount">
              Characters left
              {' '}
              <span className="Q-name-count">{charCountName}</span>
            </div>
          </div>
        </div>
        <div className="add-question-container-email">
          <label>Email: </label>
          <input
            className="add-question-email"
            type="text"
            placeholder="Email Here"
            value={email}
            maxLength="60"
            onChange={handleEmail}
          />
          <div>
            <div className="question-charCount">
              Characters left
              {' '}
              <span className="Q-email-count">{charCountEmail}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="add-question-container-body">
        <h6>Question: </h6>
        <textarea
          className="add-question-body"
          type="text"
          placeholder="Why did you like the product or not?"
          value={body}
          maxLength="1000"
          onChange={handleBody}
        />
        <div className="question-charCount">
          Characters left
          {' '}
          <span className="Q-body-count">{charCountBody}</span>
        </div>
      </div>
      <span>For your privacy, do not use your full name or email address</span>
      <div className="add-question-btn py-3 w-25 mx-auto my-2">
        <button className="question-submit" onClick={handleQuestionSubmit} type="button">Submit</button>
      </div>
    </div>
  );
};

AddQuestionForm.propTypes = {
  questionInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AddQuestionForm;
