export const APIKey = "db254b5cd61744d39a2deebd9c361444";
export const recipesDiv = document.getElementById('recipes-div');

export async function search(string){
    try{
        let response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKey}&query=${string}&addRecipeInformation=true&addRecipeNutrition=true`);
        if (!response.ok){
            let error = document.createElement("h3");
            error.classList.add("error");
            if (response.status == 402){
                error.textContent = "Sorry, all possible searches have been made today. Try Again tomorrow!"
                recipesDiv.appendChild(error);
            }else{
                error.textContent = "Oops, something went wrong. Please try again.";
                recipesDiv.appendChild(error);
            };
        }
        let data = await response.json()
        return data;
    } catch(e){
        window.alert(`Oops, there was an issue: ${e}`)
    }
}

export async function createMealCard(meals){
    meals.forEach(meal => {
        let div = document.createElement("div");
        let h3 = document.createElement("h3");
        let img = document.createElement("img");
        let recipe = document.createElement("p");
        let recipeLink = document.createElement("a");
        
        div.classList.add("card");
        recipeLink.classList.add("recipe-link");

        recipeLink.setAttribute("href", meal.sourceUrl)
        img.setAttribute("alt", `Image of ${meal.title}`)
        img.setAttribute("width", "400");
        img.setAttribute("src", meal.image);

        h3.innerHTML = meal.title;
        recipeLink.innerHTML = meal.sourceUrl;

        recipe.appendChild(recipeLink);
    
        div.appendChild(h3);
        div.appendChild(img);
        div.appendChild(recipe);


        recipesDiv.appendChild(div);
    });
}
export async function createFooterYear(){
    let d = new Date();
    let yyyy = d.getFullYear();
    //find span
    let yearSpan = document.getElementById("year");
    //place current year in span
    yearSpan.innerHTML = yyyy;
}
export async function loadHeaderFooter(){
    const header = await loadTemplate('/comida/partials/header/main-header.html');
    const footer = await loadTemplate('/comida/partials/footer/main-footer.html');
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');
    renderWithTemplate(header, headerElement);
    renderWithTemplate(footer, footerElement);
    createFooterYear();
}
export async function loadTemplate(path){
    const html = await fetch(path).then(convertToText);
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
}
function convertToText(res) {
    if (res.ok) {
        return res.text();
    } else{
        throw new Error('Bad Response');
    }
}
export async function renderWithTemplate(template, parent, data, callback){
    let clone = template.content.cloneNode(true);
    if(callback) {
        clone = callback(clone, data);
    }
    parent.appendChild(clone);
}