export function showElement(element) {
    element.classList.remove("hidden");
}
  
export function hideElement(element) {
    element.classList.add("hidden");
}

export function clearView(view) {
    view.innerHTML = "";
}

export function searchErrorMsg(view) {
    view.innerHTML = "<h3>Sorry, nothing found! Try another search.</h3>";
}

export function getRecipeBox(view, recipe) {
    view.innerHTML += `
        <div class="box recipe-box">
            <img id=${recipe.id} src=${recipe.image} alt="${recipe.name} image"/>
            <h4 class="recipe-name">${recipe.name}</h4>
        </div>`
}

export function recipeDetails(view, currentRecipe, instructionsList, allIngredientsData, currentUser) {
    view.innerHTML = `
        <h3 class="recipe-name">${currentRecipe.name}</h3>
        <h4>Ingredients</h4>
        <table class="ingredient-list" id="ingredientList"></table>
        <h4>Total Cost</h4>
        <p>$${currentRecipe.getTotalCostInDollars(allIngredientsData)}</p>
        <h4>Favorite</h4>
        <div class="favorite-star" id=${currentRecipe.id}>
            <img class="star-icon empty-star icon" id=${currentRecipe.id} src="" alt="star icon"/>
        </div>
        <h4>To Cook</h4>
        <div class="to-cook-tool" id=${currentRecipe.id}>
            <img class="to-cook-icon empty-to-cook icon" id=${currentRecipe.id} src="" alt="chef tools icon"/>
        </div>
        <h4>Cook Status: <span id="cookStatusText">Ready to Cook!</span></h4>
        <div class="to-cook-status" id="toCookStatus">
            <table class="missing-ingredient-list" id="missingIngredientList"></table>
        </div>
        <div id="useIngredientUpdates"></div>`;

    loadIngredientList(currentRecipe, allIngredientsData);

    if(currentUser.pantry.isIngredientMissing(currentRecipe, allIngredientsData)) {
        loadMissingIngredients(currentUser, currentRecipe, allIngredientsData);
        loadTimesCooked(view, currentUser, currentRecipe);
    } else {
        loadReadyToCookIcon(currentRecipe);
    }
    loadRecipeInstructions(currentRecipe, instructionsList);
}

function loadRecipeInstructions(currentRecipe, instructionsList) {
    instructionsList.innerHTML = "<h3>Instructions</h3>";
    currentRecipe.instructions.forEach((instruction) => {
        instructionsList.innerHTML += `
            <li class="instruction">${instruction.instruction}</li>`
    });
}

export function loadTimesCooked(view, currentUser, currentRecipe) {
    let timesCooked = 0;
    let result = currentUser.recipesCooked.find(recipeCooked => {
        return currentRecipe.id === recipeCooked.id;
      });
    if (result) {
        timesCooked = result.timesCooked;
    }
    view.innerHTML += `<p class="cooked-count">You've cooked this recipe: ${timesCooked} times.</p>`
}

function loadReadyToCookIcon(currentRecipe) {
    const toCookStatus = document.querySelector("#toCookStatus");
    toCookStatus.innerHTML = `
        <div class="check-mark" id=${currentRecipe.id}>
            <img class="check-mark-icon icon" id=${currentRecipe.id} src="./images/check-mark.png" alt="green and white check mark icon"/>
        </div>`
}

function loadMissingIngredients(currentUser, currentRecipe, allIngredientsData) {
    const cookStatusText = document.querySelector("#cookStatusText");
    cookStatusText.innerText = "Not ready. You're missing the following...";
    const missingIngredientList = document.querySelector("#missingIngredientList");
    missingIngredientList.innerHTML = `
        <tr>
            <th>Ingredient</th>
            <th>Amount Missing</th>
        </tr>`;
    let missingIngredients = currentUser.pantry.getMissingIngredients(currentRecipe, allIngredientsData);
    missingIngredients.forEach(ingredient => {
        missingIngredientList.innerHTML += `
        <tr>
            <td>${ingredient.name}</td>
            <td>${ingredient.amountNeeded}</td>
        </tr>`;
    });
}

function loadIngredientList(currentRecipe, allIngredientsData) {
    const ingredientList = document.querySelector("#ingredientList");
    ingredientList.innerHTML = `
        <tr>
            <th>Ingredient</th>
            <th>Amount</th>
        </tr>`;
    currentRecipe.getIngredientIds(allIngredientsData).forEach(ingredientId => {
        ingredientList.innerHTML += `
        <tr>
            <td>${currentRecipe.getIngredientName(ingredientId, allIngredientsData)}</td>
            <td>${currentRecipe.getQuantityRequired(ingredientId, allIngredientsData)}</td>
        </tr>`;
    });
}

export function displayCookMessages(useIngredientUpdates, useIngredientMessages) {
    useIngredientMessages.forEach(message => {
      useIngredientUpdates.innerHTML += `
        <h4>${message}</h4>`
    });
}

export function iconToFull(iconName) {
    let icon = document.querySelector(`.${iconName}-icon`);
    icon.src = `./images/full-${iconName}.png`;
    icon.classList.remove(`empty-${iconName}`);
    icon.classList.add(`full-${iconName}`);
}
  
export function iconToEmpty(iconName) {
    let icon = document.querySelector(`.${iconName}-icon`);
    icon.src = `./images/empty-${iconName}.png`;
    icon.classList.remove(`full-${iconName}`);
    icon.classList.add(`empty-${iconName}`);
}

export function pantryTitle(view, name) {
    view.innerHTML = `<h3 class="page-title">Recipes for ${name} To Cook:</h3>`;
}

export function loadPantry(pantryList, allIngredientsData, currentUser, addStatus="") {
    document.querySelector("#pantryTitle").innerText = `${currentUser.name}'s Pantry:`;
    document.querySelector("#addMsg").innerText = addStatus;
    pantryList.innerHTML = `        
        <tr>
            <th>Ingredient</th>
            <th>Amount</th>
        </tr>`;
    currentUser.pantry.ingredientsInPantry.forEach((ingredient, idx) => {
      pantryList.innerHTML += `
        <tr>
          <td>${currentUser.pantry.getIngredientNames(allIngredientsData)[idx]}</td>
          <td>${currentUser.pantry.getIngredientAmounts(allIngredientsData)[idx]}</td>
        </tr>`;
    });
  }

export function loadTagSuggestions() {
    const tagSuggestions = ["antipasti", "starter", "snack", "appetizer", "antipasto", "side dish", "lunch", 
    "main dish", "main course", "dinner", "sauce", "morning meal", "breakfast", "brunch", "condiment", 
    "dip", "spread", "salad"];
    const tagSuggestionsDisplay = document.querySelector("#tagSuggestions");
    tagSuggestionsDisplay.innerHTML = "<h4>Tag Suggestions: </h4>";
    tagSuggestions.forEach(tag => {
      tagSuggestionsDisplay.innerHTML += `${tag} - `;
    });
  }