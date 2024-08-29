const searchBox = document.querySelector(".searchbox");
const searchBtn = document.querySelector(".searchbtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-details");
document.getElementById('logo').addEventListener('click', () => {
    location.reload();
  });  


const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = '   Searching Recipes...';
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
    
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strCategory}</p>
            <p>${meal.strArea}</p>
        `;
        const button = document.createElement("button");
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener("click", () => {
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });
} catch (error) {
    recipeContainer.innerHTML = "An error occurred while searching for the recipes";
}
    
}

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
    }
    else{
        break;
    }
}
return ingredientsList;
}


const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
        </div>
    `;
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener("click", () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = "Please enter a recipe name";
        return;
    }
    fetchRecipes(searchInput);
});


