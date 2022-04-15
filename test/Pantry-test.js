import { expect } from 'chai';
import { Ingredient } from '../src/classes/Ingredient';
import { Pantry } from '../src/classes/Pantry';
import { Recipe } from '../src/classes/Recipe';
import { ingredientsSampleData } from '../src/data/ingredients-sample-data';
import { usersSampleData } from '../src/data/users-sample-data.js';
import { recipesSampleData } from '../src/data/recipes-sample-data.js';
import { User } from '../src/classes/User.js'


describe('Pantry Test', () => {
    let pantry0;
    let pantry1;
    let pantryData;
    let user1;
    let ingredient;
    let ingredientsData;
    let recipeData;
    let recipe;

    beforeEach(() => {
        user1 = new User(usersSampleData[0]);
        pantry0 = new Pantry();
        pantry1 = new Pantry(user1.pantry);
        ingredient = ingredientsSampleData[8];
        recipeData = recipesSampleData[0];
        recipe = new Recipe(recipeData);
        ingredientsData = ingredientsSampleData;
    });

    it('should create a new instance of Pantry', () => {
        expect(pantry1).to.be.an.instanceof(Pantry);
    });

    it('should start empty', () => {
        expect(pantry0.ingredients).to.deep.equal([]);
    });

    it('should take in a user pantry', () => {
        expect(pantry1.ingredients).to.deep.equal(user1.pantry);
    });

    it('howdy', () => {
        // expect(pantry1.addIngredient(ingredient)).to.equal()
        console.log("Adding first ingredient....")
        pantry1.addIngredient(ingredient, 7);
        console.log("Adding second ingredient....")
        pantry1.addIngredient(ingredient, 666);
        // console.log('var ingredientData',ingredientData)
        // console.log('var ingriedein', ingredient)
    });

    it('howdy2', () => {
        // expect(pantry1.addIngredient(ingredient)).to.equal()
        console.log("\nremove first ingredient.... (doesn't exist)")
        console.log(pantry1.removeIngredient(ingredient, 7));

        console.log(pantry1.addIngredient(ingredient, 666));
        console.log("\nremove ingredient.... (exists now)")
        console.log(pantry1.removeIngredient(ingredient, 600));
        console.log(pantry1.removeIngredient(ingredient, 66));
    });

    it.only('howdy3', () => {
        // pantry1.getIngredientDetails(ingredientsData);
        // console.log(ingredientData);
        // console.log(user1.pantry)
        // console.log(user1.pantry.getCurrentQuantity(2027));
        // console.log(user1.pantry.compareRecipeToPantry(recipe, ingredientsData));
        console.log(user1.pantry.getMissingIngredients(recipe, ingredientsData));
    });
});
