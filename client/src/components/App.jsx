/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Overview from './overview/Overview.jsx';
import QuestionsView from './questionsandanswers/QuestionsView.jsx';
import RatingsAndReviews from './ratingsandreviews/RatingsAndReviews.jsx';
import Connect from './Connect';

const App = () => {
  // both the this.state and this.setState()
  const [productInfo, setProductInfo] = useState({});
  const [productReviewMeta, setProductReviewMeta] = useState({});
  const [questionInfo, setQuestionInfo] = useState({});

  //  Component Did Mount
  useEffect(async () => {
    const id = window.location.pathname.split('/')[2]; // splits '/products/###/' to '/', 'products', '####, '/'. we just want the numbers
    const product = await Connect.getProductById(id);
    const reviewMeta = await Connect.getReviewMeta(product.data.id);
    const questions = await Connect.getQuestions(product.data.id);


    setQuestionInfo({questions: questions.data.results});
    setProductInfo({ product: product.data });
    setProductReviewMeta(reviewMeta.data);

  }, []);

  return (
    <>
      {productInfo.product ? (
        <Overview
          Name={productInfo.product.name}
          Category={productInfo.product.category}
          Description={productInfo.product.description}
          Slogan={productInfo.product.slogan}
          Price={productInfo.product.default_price}
          ReviewsRatings={productReviewMeta.ratings}
        />
      ) : null}
      <>
      {questionInfo.questions ? (
      <QuestionsView
        questionInfo={questionInfo}
        // question_id={questionInfo.questions.question_id}
        // Body={questionInfo.questions.question_body}
        // Date={questionInfo.questions.question_date}
        // User={questionInfo.questions.asker_name}
        // Helpfulness={questionInfo.questions.question_helpfulness}
        // Reported={questionInfo.questions.reported}


      />
       ) : null}
      </>
      <RatingsAndReviews />
    </>
  );
};

export default App;
