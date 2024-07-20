// pages/create-recipe.tsx

"use client";

import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadfile";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import axios from "axios";
import { useAuth } from "@/lib/useAuth";
import { UserNew } from "@/lib/types";


const CreateRecipe = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [newUser, setNewUser] = useState<UserNew | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();
  const [userRecipes, setUserRecipes] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
        setNewUser({
            uid: user.uid,
            email: user.email ?? "",
        });
        const fetchUserData = async () => {
            try {
                const userIdResponse = await axios.get(`http://127.0.0.1:8000/api/users/email/${user.email}`);
                const fetchedUserId = userIdResponse.data.id;
                setUserId(fetchedUserId);

                const userResponse = await axios.get(`http://127.0.0.1:8000/api/users/${fetchedUserId}`);
                setUserRecipes(userResponse.data.recipes);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUserData();
    }
}, [user]);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      setImageUrl(data.url);
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);

    toast({
      title: `${file.file.type} type is not supported.`,
      description: "Please choose a PNG, JPG, or JPEG image instead.",
      variant: "destructive"
    });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, {});
    setIsDragOver(false);
  };

  const handleSubmit = async () => {
    console.log(imageUrl);
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/recipes/create/", {
            title,
            description,
            ingredients,
            instructions,
            image_url: imageUrl,
            user_email: newUser?.email
        });

        if (response.status === 201) {
            const recipeId = response.data.id;

            if (newUser?.email && userId) {
                const updatedRecipes = [...userRecipes, recipeId];
                await axios.put(`http://127.0.0.1:8000/api/users/${userId}/update/`, {
                    recipes: updatedRecipes
                });
                setUserRecipes(updatedRecipes);
            }

            router.push("/");
        } else {
            console.log(response.status);
            toast({
                title: "Error creating recipe",
                description: "There was an error creating your recipe.",
                variant: "destructive"
            });
        }
    } catch (error) {
        toast({
            title: "Error creating recipe",
            description: "There was an error creating your recipe.",
            variant: "destructive"
        });
    }
};

  const [isPending, startTransition] = useTransition();

  return (
    <div className="relative h-full flex-1 w-full rounded-xl bg-slate-50 p-2 lg:rounded-2xl flex justify-center flex-col items-center pb-8">
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <h1 className="text-5xl font-bold my-8">Create Recipe</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructions">
              Instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {imageUrl ? (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uploadedImage">
                Uploaded Image
              </label>
              <img src={imageUrl} alt="Uploaded" className="w-full rounded-xl" />
            </div>
          ) : (
            <div className="relative flex flex-1 flex-col items-center justify-center w-full p-16 ring-1 ring-inset ring-gray-900/10 mb-4 rounded-xl">
              <Dropzone
                onDropRejected={onDropRejected}
                onDropAccepted={onDropAccepted}
                accept={{
                  "image/png": [".png"],
                  "image/jpg": [".jpg"],
                  "image/jpeg": [".jpeg"],
                }}
                onDragEnter={() => setIsDragOver(true)}
                onDragLeave={() => setIsDragOver(false)}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    className="h-full w-full flex-1 flex flex-col items-center justify-center"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {isDragOver ? (
                      <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
                    ) : isUploading ? (
                      <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
                    ) : (
                      <Image className="h-6 w-6 text-zinc-500 mb-2" />
                    )}
                    <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <p>Uploading...</p>
                          <Progress value={uploadProgress} className="mt-2 w-40 h-2 bg-gray-300" />
                        </div>
                      ) : isPending ? (
                        <div className="flex flex-col items-center">
                          <p>Redirecting, please wait</p>
                        </div>
                      ) : isDragOver ? (
                        <p>
                          <span className="font-semibold">Drop file</span> to upload
                        </p>
                      ) : (
                        <p>
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                      )}
                    </div>
                    {isPending ? null : (
                      <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
          )}
          <div className="flex items-center justify-around">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;