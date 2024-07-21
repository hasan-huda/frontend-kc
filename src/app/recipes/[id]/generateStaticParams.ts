import axios from 'axios';

export async function generateStaticParams() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/recipes/`);
  const recipes = response.data;

  return recipes.map((recipe: { id: number }) => ({
    id: recipe.id.toString(),
  }));
}