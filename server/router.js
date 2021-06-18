/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const express = require('express');
const path = require('path');
const morgan = require('morgan'); // for server tracking
const cookieParser = require('cookie-parser');
const connect = require('./connect');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(morgan('dev')); // see in the server commandline the method, url and speed it took
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ===================== Product Information =======================

// trying to figure out how to render the page and product number
app.get('/products/:productId', (req, res) => {
  // res.cookie('productInfo', `${req.params.productId}`);
  res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// all products
app.get('/api/products', (req, res) => {
  const { count } = req.query;
  connect.getProducts({ page: 1, count })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(500).send('error at API fetch', error);
    });
});

// get by product id
app.get('/api/products/:productId', (req, res) => {
  const { productId } = req.params; // productId = req.params.productId;
  connect.getProductId({ id: productId })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(500).send('error at API fetch', error);
    });
});

// get by product id
app.get('/api/products/:productId/styles', (req, res) => {
  const { productId } = req.params; // productId = req.params.productId;
  connect.getProductIdStyle({ id: productId })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(500).send('error at API fetch', error);
    });
});

// =====================QA GET=======================>>>
app.get('/api/qa/questions', (req, res) => {
  connect.getQuestions(req.query)
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(200).send(error);
    });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  connect.getAnswers(req.query)
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(200).send(error);
    });
});

// =====================QA PUT============================>>>
app.put('/api/qa/questions/helpful/', (req, res) => {
  connect.getHelpfulnessQuestions({ question_id: req.body.questionId })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      res.send(500, err);
    });
});

app.put('/api/qa/answers/:answerId/helpful/', (req, res) => {
  connect.putHelpfulnessAnswers({ answer_id: Number(req.params.answerId) })
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => {
      res.send(500, err);
    });
});

app.put('/api/qa/questions/:questionId/report/', (req, res) => {
  connect.putReportQuestion({ question_id: Number(req.params.questionId) })
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      res.send(500, err);
    });
});
// =====================QA POST===========================>>>
app.post('/api/qa/questions', (req, res) => {
  req.body.product_id = Number(req.body.product_id);
  connect.postAddQuestion(req.body)
    .then((result) => {
      res.status(200).end(result.data);
    })
    .catch((err) => {
      if (err.response.status === 422) {
        res.send(422, 'Please check to make sure your information is corretct');
      }
      res.send(err.response.status, err);
    });
});

app.post('/api/qa/questions/:question_id/answers', (req, res) => {
  connect.postAddAnswer(req.body, Number(req.params.question_id))
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      if (err.response.status === 422) {
        res.send(422, 'Please check to make sure your information is corretct');
      }
      res.send(err.response.status, err);
    });
});

// =====================REVIEWS GET=======================>>>
app.get('/api/reviews', (req, res) => {
  connect.getReviews(req.query)
    .then((result) => {
      res.send(200, result.data);
    })
    .catch((err) => {
      res.send(500, err);
    });
});

app.get('/api/reviews/meta', (req, res) => {
  connect.getReviewsMeta(req.query.id)
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((error) => {
      res.status(200).send(error);
    });
});

app.put('/api/:review_id/report', (req, res) => {
  connect.reportReview(req.params.review_id);
  res.send(200);
});

app.put('/api/:id/helpful', (req, res) => {
  connect.setHelpfulReview(req.params.id);
  res.send(200);
});

app.post('/reviews', (req, res) => {
  connect.addReview(req.body)
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      res.status(err.response.status).send(err.response.statusText);
    });
});

app.get('/test', (req, res) => {
  res.status(200).send('hello from test!');
});

module.exports = app;
