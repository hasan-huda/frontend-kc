"use client";
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

const featuredRecipeIds = [12, 13, 14]; // Replace with actual recipe IDs

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const promises = featuredRecipeIds.map(id =>
          axios.get(`http://127.0.0.1:8000/api/recipes/${id}`).then(response => response.data)
        );
        const fetchedRecipes = await Promise.all(promises);
        setRecipes(fetchedRecipes);
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
    <section className="bg-slate-100 py-8">
      <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
          <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
            Featured Recipes
          </h2>
        </div>
        <div className="mx-auto grid max-w-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {recipes.map((recipe) => (
            <Card key={recipe.id} onClick={() => handleCardClick(recipe.id)} className="cursor-pointer w-full">
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
      <div className="pt-16"></div>
    </section>
  );
};

export default FeaturedRecipes;