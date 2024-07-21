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
import { AlarmClock } from "lucide-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url: string;
  cooking_time: number;
  user_email: string;
}

const BrowseRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/recipes/`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/recipes/${id}`);
  };

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

  return (
    <MaxWidthWrapper>
      <h1 className="text-4xl font-bold mb-8 mt-8">Browse Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} onClick={() => handleCardClick(recipe.id)} className="cursor-pointer">
            <CardHeader>
              <CardTitle className="left-0 text-bold text-2xl bg-opacity-50 text-black w-full text-center py-1">
                {recipe.title}
              </CardTitle>
              <img src={recipe.image_url} alt={recipe.title} className="w-full h-48 object-cover rounded-t-md" />
            </CardHeader>
            <CardContent>
              <CardDescription>{recipe.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-gray-500 text-sm">User: {getEmailPrefix(recipe.user_email)}</div>
              <div className="flex items-center text-gray-500 text-sm">
                <AlarmClock className="w-3 h-3 mr-1" />
                {formatCookingTime(recipe.cooking_time)}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default BrowseRecipes;