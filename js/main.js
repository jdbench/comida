import { loadHeaderFooter, search, createMealCard, recipesDiv } from "./utils.js";

loadHeaderFooter();

const searchForm = document.querySelector('form');
var query = '';
var meals;

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    query = event.target.querySelector('input').value;
    try{
        meals=[];
        search(query)
        .then(data => meals = data.results)
        .then(meals => createMealCard(meals))
        .then(meals => console.log(meals));
    } catch(e){
        let error = document.createElement('h2');
        error.textContent = `Oops, there was an error: ${e}`;
        recipesDiv.appendChild(error);
    }
});
