import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import Header from "./_components/header/header"

export default function Component() {
  const popularRecipes = [
    {
      id: 1,
      title: "Classic Chocolate Chip Cookies",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.8,
      reviews: 1234,
    },
    {
      id: 2,
      title: "Fluffy Buttermilk Pancakes",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.6,
      reviews: 789,
    },
    {
      id: 3,
      title: "Homemade Sourdough Bread",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.9,
      reviews: 456,
    },
    {
      id: 4,
      title: "Decadent Fudgy Brownies",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.7,
      reviews: 321,
    },
  ]
  const recommendedRecipes = [
    {
      id: 5,
      title: "Lemon Meringue Pie",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.5,
      reviews: 210,
    },
    {
      id: 6,
      title: "Soft Pretzel Bites",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.8,
      reviews: 154,
    },
    {
      id: 7,
      title: "Creamy Cheesecake",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.6,
      reviews: 298,
    },
    {
      id: 8,
      title: "Moist Carrot Cake",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.7,
      reviews: 175,
    },
  ]
  const latestRecipes = [
    {
      id: 9,
      title: "Flaky Pie Crust",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.4,
      reviews: 87,
    },
    {
      id: 10,
      title: "Crispy Fried Chicken",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.9,
      reviews: 120,
    },
    {
      id: 11,
      title: "Soft and Chewy Oatmeal Cookies",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.6,
      reviews: 65,
    },
    {
      id: 12,
      title: "Moist Red Velvet Cupcakes",
      image: "https://storage.googleapis.com/baking-buddy-bucket/RecipeProfile/2869962f-6358-41a5-9a4f-04d57c32e5c6_tomato.jpeg",
      rating: 4.8,
      reviews: 92,
    },
  ]
  return (
    <div className="bg-background text-foreground">
      
      <main className="container mx-auto py-8 md:py-12">
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">이번주 인기 레시피</h2>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {popularRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden">
                <Link href="#" prefetch={false}>
                  <CardContent>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      width={400}
                      height={300}
                      className="h-48 w-full object-cover"
                    />
                    <div className="mt-4 space-y-2">
                      <h3 className="text-lg font-semibold">{recipe.title}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <StarIcon className="h-5 w-5" />
                          <span>{recipe.rating}</span>
                        </div>
                        <span className="text-muted-foreground">({recipe.reviews} reviews)</span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>        
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">최근에 본 레시피</h2>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {latestRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden">
                <Link href="#" prefetch={false}>
                  <CardContent>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      width={400}
                      height={300}
                      className="h-48 w-full object-cover"
                    />
                    <div className="mt-4 space-y-2">
                      <h3 className="text-lg font-semibold">{recipe.title}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <StarIcon className="h-5 w-5" />
                          <span>{recipe.rating}</span>
                        </div>
                        <span className="text-muted-foreground">({recipe.reviews} reviews)</span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </main>      
    </div>
  )
}

function SearchIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function StarIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function XIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}