import { Request, Response } from "express";
import cookbookModel from "./Cookbook";

// Add a recipe to a cookbook
const addRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cookbookId } = req.params;
    const recipeData = req.body;

    const cookbook = await cookbookModel.findById(cookbookId);

    if (!cookbook) {
      res.status(404).json({ message: "Cookbook not found" });
      return;
    }

    // Add the recipe to the recipes array
    cookbook.recipes.push(recipeData);

    // Save the updated cookbook
    await cookbook.save();

    res.status(200).json({ message: "Recipe added to cookbook", cookbook });
  } catch (error) {
    console.error("Error adding recipe to cookbook:", error);
    res.status(500).json({ message: "Failed to add recipe to cookbook", error: (error as Error).message });
  }
};

// Update a recipe in a cookbook
const updateRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cookbookId, recipeId } = req.params;
    const updatedRecipeData = req.body;

    const cookbook = await cookbookModel.findById(cookbookId);

    if (!cookbook) {
      res.status(404).json({ message: "Cookbook not found" });
      return;
    }

    // Find the recipe by _id
    const recipeIndex = cookbook.recipes.findIndex((recipe) => recipe._id === recipeId);

    if (recipeIndex === -1) {
      res.status(404).json({ message: "Recipe not found in cookbook" });
      return;
    }

    // Update the recipe
    cookbook.recipes[recipeIndex] = { ...cookbook.recipes[recipeIndex], ...updatedRecipeData };

    // Save the updated cookbook
    await cookbook.save();

    res.status(200).json({ message: "Recipe updated in cookbook", recipe: cookbook.recipes[recipeIndex] });
  } catch (error) {
    console.error("Error updating recipe in cookbook:", error);
    res.status(500).json({ message: "Failed to update recipe in cookbook", error: (error as Error).message });
  }
};

// Remove a recipe from a cookbook
const removeRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cookbookId, recipeId } = req.params;

    const cookbook = await cookbookModel.findById(cookbookId);

    if (!cookbook) {
      res.status(404).json({ message: "Cookbook not found" });
      return;
    }

    // Filter out the recipe by _id
    cookbook.recipes = cookbook.recipes.filter((recipe) => recipe._id !== recipeId);

    // Save the updated cookbook
    await cookbook.save();

    res.status(200).json({ message: "Recipe removed from cookbook", cookbook });
  } catch (error) {
    console.error("Error removing recipe from cookbook:", error);
    res.status(500).json({ message: "Failed to remove recipe from cookbook", error: (error as Error).message });
  }
};

// Get a cookbook with all recipes
const getCookbookContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cookbookId } = req.params;

    const cookbook = await cookbookModel.findById(cookbookId);

    if (!cookbook) {
      res.status(404).json({ message: "Cookbook not found" });
      return;
    }

    res.status(200).json({ cookbook });
  } catch (error) {
    console.error("Error fetching cookbook:", error);
    res.status(500).json({ message: "Failed to fetch cookbook", error: (error as Error).message });
  }
};

export default {
  addRecipe,
  updateRecipe,
  removeRecipe,
  getCookbookContent,
};