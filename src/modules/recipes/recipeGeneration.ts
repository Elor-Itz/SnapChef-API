import dotenv from 'dotenv';
import { GoogleGenerativeAI, GenerateContentResult } from '@google/generative-ai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY must be defined in .env');
}

const genAI = new GoogleGenerativeAI(apiKey);

const createRecipe = async (ingredients: string): Promise<string> => {
  try {
    const prompt = `Create a recipe using the following ingredients: ${ingredients}. Please provide instructions, cooking time, and serving suggestions.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result: GenerateContentResult = await model.generateContent([prompt]);

    if (result && result.response && result.response.text) {
      let recipe: string = '';

      if (typeof result.response.text === 'function') {
        const textResult = result.response.text();
        if (typeof textResult === 'string') {
          recipe = textResult.trim();
        }
      } else if (typeof result.response.text === 'string') {
        recipe = (result.response.text as string).trim();
      }

      if (recipe) {
        return recipe;
      } else {
        throw new Error('Generated response was empty or not a valid string.');
      }
    } else {
      throw new Error('Failed to retrieve recipe from the generated response.');
    }
  } catch (error: any) {
    console.error('Error generating recipe:', error);

    let errorMessage = 'Failed to generate recipe. An unexpected error occurred.';

    if (error.response && error.response.data && error.response.data.error) {
      errorMessage = `API Error: ${error.response.data.error.message}`;
    } else if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }

    throw new Error(errorMessage);
  }
};

export { createRecipe };