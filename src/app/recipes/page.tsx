"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

const BrowseRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/recipes/");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/recipes/browse/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Browse Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} onClick={() => handleCardClick(recipe.id)} className="cursor-pointer">
            <CardHeader>
              <img src={recipe.image_url} alt={recipe.title} className="w-full h-48 object-cover rounded-t-md" />
              <CardTitle>{recipe.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{recipe.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrowseRecipes;