import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import FeaturedRecipes from "@/components/FeaturedRecipes";

// import { app } from "@/lib/firebaseConfig";

export default function Home() {
    return (
        <div className="bg-slate-50">
            <section>
                <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
                    <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
                        <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                            <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                                <img src="/kanga-1.png" className="w-full" />
                            </div>
                            <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                                Discover Your{" "}
                                <span className="bg-orange-600 px-2 text-white">
                                    Asian
                                </span>{" "}
                                Stomach
                            </h1>
                            <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                                Kangacook invites you to share your cooking
                                ideas, explore recipes from{" "}
                                <span className="font-semibold">
                                    all over the world
                                </span>
                                , and enjoy the pleasure of cooking and sharing!
                            </p>

                            <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                                <div className="space-y-2">
                                    <li className="flex gap-1.5 items-center text-left">
                                        <Check className="h-5 w-5 shrink-0 text-orange-600" />
                                        Best Authentic Asian Recipes
                                    </li>
                                    <li className="flex gap-1.5 items-center text-left">
                                        <Check className="h-5 w-5 shrink-0 text-orange-600" />
                                        Step-by-Step Instructions
                                    </li>
                                    <li className="flex gap-1.5 items-center text-left">
                                        <Check className="h-5 w-5 shrink-0 text-orange-600" />
                                        Ingredient Guides
                                    </li>
                                </div>
                            </ul>

                            <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                                <div className="flex flex-col justify-between items-center sm:items-start">
                                    <div className="flex gap-0.5">
                                        <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                                        <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                                        <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                                        <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                                        <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                                    </div>
                                    <p>
                                        <span className="font-semibold">
                                            300+
                                        </span>{" "}
                                        authentic recipies
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            <section className="bg-slate-100 py-8">
                <MaxWidthWrapper className="py-2">
                    <FeaturedRecipes />
                    <ul className="mx-auto max-w-prose sm:text-lg space-y-2 w-fit">
                        <div className="flex justify-center">
                            <Link
                                className={buttonVariants({
                                    size: "lg",
                                    className: "mx-auto mt-8",
                                })}
                                href="/recipes"
                            >
                                Browse All Recipes{" "}
                                <ArrowRight className="h-4 w-4 ml-1.5" />
                            </Link>
                        </div>
                    </ul>
                </MaxWidthWrapper>

                <div className="pt-8"></div>
            </section>
            <section>
                <MaxWidthWrapper className="py-24">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                            Upload your recipe{" "}
                            <span className="relative px-2 bg-orange-600 text-white">
                                today
                            </span>
                        </h2>
                    </div>
                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40"></div>
                    </div>

                    <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
                        <div className="flex justify-center">
                            <Link
                                className={buttonVariants({
                                    size: "lg",
                                    className: "mx-auto mt-8",
                                })}
                                href="/recipes/create"
                            >
                                Create your recipe now{" "}
                                <ArrowRight className="h-4 w-4 ml-1.5" />
                            </Link>
                        </div>
                    </ul>
                </MaxWidthWrapper>
            </section>
        </div>
    );
}
