"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlarmClock } from "lucide-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  image_url: string;
  cooking_time: number;
  user_email: string;
}

const RecipeDetail = () => {
  const { id } = useParams(); // useParams to get the dynamic route parameter
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const formatCookingTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hr${remainingMinutes > 0 ? ` ${remainingMinutes} min` : ""}`;
    }
  };

  const getEmailPrefix = (email: string) => {
    return email.split("@")[0];
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <MaxWidthWrapper className="py-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="left-0 bg-zinc-200 text-orange-600 text-3xl rounded-sm w-full text-center py-2">
            {recipe.title}
          </CardTitle>
          <img src={recipe.image_url} alt={recipe.title} className="w-full h-96 object-cover rounded-t-md" />
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg font-bold mb-2">Description</CardDescription>
          <CardDescription>{recipe.description}</CardDescription>
          <CardDescription className="text-lg font-bold mb-2 mt-4">Ingredients</CardDescription>
          <CardDescription>{recipe.ingredients}</CardDescription>
          <CardDescription className="text-lg font-bold mb-2 mt-4">Instructions</CardDescription>
          <CardDescription>{recipe.instructions}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-gray-500">User: {getEmailPrefix(recipe.user_email)}</div>
          <div className="flex items-center text-gray-500">
            <AlarmClock className="w-4 h-4 mr-1" />
            {formatCookingTime(recipe.cooking_time)}
          </div>
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
  );
};

export default RecipeDetail;