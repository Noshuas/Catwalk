
# Project Catwalk

Hack Reactor front end capstone. We are tasked with updating an old ecommerce front end to modern techonologies.
As a group we created three main components which were the Overview, Questions & Answers, Ratings & Reviews.
Utilizing React with React hooks accelarated development time and enriched the e-commerce browsing experience.



  



## Authors

- [@Joshua Santos](https://github.com/MrNiceRicee) - Scope: Overview and Home page

- [@Devin Hight](https://github.com/dhightnm) - Scope: Questions and Answers

- [@Noshua Setzer](https://github.com/Noshuas) - Scope: Ratings and Reviews
## Demo
### Home page 
Home page is where all* of the products will show up. 

\* there will be some products not shown because of edge case detections. You can manually navigate to them by adding `/products/:productId` to the url
![Alt Text](https://media.giphy.com/media/4gbKIxFYGwotp3jnI5/giphy.gif)

### Overview
Provides a quick insight on the product. Showing the different styles available, prices, and the images of the product displayed. The Overview displays the hero image front and center. With it having an expanded view to zoom in on the details of the product. Navigating to the styles will show the variances of the product, with images, sizes and product availability.


### Questions and Answers
The Questions and Answers widget deals with all incoming questions and answers for the specified product on the page. From here a user can see posted questions, post their own questions, mark them as helpful or report them. On render the page will initially load four questions, any more questions after that, the user is given the option to load more. Within the questions card, a user can see various answer responses to the question. A user can add their own answers to the specific question by accessing the add answer modal and within the modal a user can upload up to 5 photos.

### Ratings and Reviews
The ratings and reviews widget breaks down rating and review information about the given product, all of which information is provided by users of the site. On page load the widget will request information from the api to dynamically render the correct information on the DOM. You can also interact with the widget to filter, sort, and add reviews.



## Installation 

Install the project with yarn. Check you have yarn installed
https://yarnpkg.com/getting-started

Check yarn version to be "berry" or 2.0+. Check the docs how to update the current yarn version
```bash 
  yarn -v
```
install dependancies
```bash 
  yarn install
```
## Environment Variables

To run this project, you will need to have a Github and [Cloudinary]('https://cloudinary.com/') token.
Then add the following environment variables to your .env file

Create a .env file.
```
touch .env
```

Edit .env file and add in the two tokens needed

`GIT_TOKEN=YourToken`

`CLOUDINARY_URL=YourToken`

## Tech Stack

**Client:** React, SASS, Axios, 

**Server:** Node, Express, Axios

**Development** Yarn, Webpack, Babel, Eslint, Jest
## Run Locally

Clone the project

```bash
  git clone https://github.com/Team-Robin/FEC-Application
```

Go to the project directory

```bash
  cd to-project-directory
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn run server-dev
```

Start the client

```bash
  yarn run react-dev
```
