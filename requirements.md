# Exam requirements

## Backend

- You have a starter code for NodeJS backend that follows MVC pattern
- Controllers are ready to be used on a way that you should provide the logic for it
- Model and a seed function that are ready to use
- server.js established for express backend with all the needed middlewares and imports

## Requirements

- Create a home endpoint that can be requested via GET method just to check everthing is working fine

- Create an endpoint that requests data from [this](https://coffeepedias.herokuapp.com/coffee-list/) api and return it as a response. your endpoint should be requested using GET method
and the provided api also should be requested using axios.get()

- The api will return to you a list of coffee types, each coffee type has id, title, description, img and ingredients

- Create an endpoint that when requested, it should recieve data of a coffee type and store it to the database as a favorite type.

- Create an endpoint that when requested it will return the list of favorite coffee list that is saved in the MongoDB

- Create an endpoint when requested, receives an id of a specific favorite coffee stored in MongoDB, and it is responsible for updating the requested favorite coffee.

- Create an endpoint when requested, receives an id of specific favorite coffee stored in MongoDB and deletes it from there.

- Test your endpoints in thunder client before using them in the frontend.

## Frontend

- Refer to the final result demo video that is provided to you to make sure you meet the requirements.

- Create a header component that has a navbar.
- the navbar should have two links/list items: Home and Favorite list.
- Create a component called home, it should show coffee types that are requested from your backend api once the component is displayed on screen, the items should be displayed in cards.

- Create a component called coffeecard, that will display coffee title, image, ingredients on the card with one button that is responsible for adding it to the favorite list.

- Create favlist component that once loaded, it will display the list of favorite coffee that are coming from your backend, items should be displayed in cards, each card must show : title, image and ingredients of the coffee, each card must also have two buttons: update and delete.

- When update button is clicked, it should show a modal that contains a form the form must have title field that has the coffee title as default value, ingredients field that also have the coffee ingredients as default value, the user should be able to update those fields, and a submit button should also be there to submit the updated data to your update endpoint that will be responsible for updating the favorite coffee in the database.

## Stretch goal

- Create a search functionality that enables the user to search for a coffee type by name using the coffee api that is provided for you.

- Sample request: `https://coffeepedias.herokuapp.com/coffee-list/?query=Black`
