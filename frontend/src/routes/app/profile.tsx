import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="grid grid-cols-[300px_1fr] gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-6">
          <Avatar className="size-32">
            <AvatarImage />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div className="grid gap-2 text-center">
            {isLoading ? (
              <div className="flex justify-center">
                <Skeleton className="w-28 h-8 bg-gray-500" />
              </div>
            ) : (
              <div className="text-2xl font-bold">{user?.data?.username}</div>
            )}

            <p className="text-muted-foreground">
              Passionate home chef and recipe enthusiast. Sharing my love for
              delicious and healthy meals.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">125</div>
              <div className="text-muted-foreground">Followers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">78</div>
              <div className="text-muted-foreground">Following</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group">
            <CardContent className="p-0">
              <img
                src="/placeholder.svg"
                alt="Recipe"
                width={400}
                height={300}
                className="object-cover w-full aspect-[4/3] rounded-t-lg group-hover:scale-105 transition-transform"
              />
            </CardContent>
            <CardFooter className="p-4 flex flex-col gap-2 justify-start">
              <div className="text-lg font-semibold">Homemade Pasta</div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Delicious homemade pasta recipe with fresh ingredients and
                easy-to-follow steps.
              </p>
            </CardFooter>
          </Card>
          <Card className="group">
            <CardContent className="p-0">
              <img
                src="/placeholder.svg"
                alt="Recipe"
                width={400}
                height={300}
                className="object-cover w-full aspect-[4/3] rounded-t-lg group-hover:scale-105 transition-transform"
              />
            </CardContent>
            <CardFooter className="p-4 flex flex-col gap-2 justify-start">
              <div className="text-lg font-semibold">Grilled Salmon</div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Perfectly grilled salmon with a delicious lemon-dill sauce.
              </p>
            </CardFooter>
          </Card>
          <Card className="group">
            <CardContent className="p-0">
              <img
                src="/placeholder.svg"
                alt="Recipe"
                width={400}
                height={300}
                className="object-cover w-full aspect-[4/3] rounded-t-lg group-hover:scale-105 transition-transform"
              />
            </CardContent>
            <CardFooter className="p-4 flex flex-col gap-2 justify-start">
              <div className="text-lg font-semibold">Vegetable Stir-Fry</div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                A quick and healthy stir-fry packed with fresh vegetables.
              </p>
            </CardFooter>
          </Card>
          <Card className="group">
            <CardContent className="p-0">
              <img
                src="/placeholder.svg"
                alt="Recipe"
                width={400}
                height={300}
                className="object-cover w-full aspect-[4/3] rounded-t-lg group-hover:scale-105 transition-transform"
              />
            </CardContent>
            <CardFooter className="p-4 flex flex-col gap-2 justify-start">
              <div className="text-lg font-semibold">Chocolate Brownies</div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Fudgy and decadent homemade chocolate brownies.
              </p>
            </CardFooter>
          </Card>
          <Card className="group">
            <CardContent className="p-0">
              <img
                src="/placeholder.svg"
                alt="Recipe"
                width={400}
                height={300}
                className="object-cover w-full aspect-[4/3] rounded-t-lg group-hover:scale-105 transition-transform"
              />
            </CardContent>
            <CardFooter className="p-4 flex flex-col gap-2 justify-start">
              <div className="text-lg font-semibold">Roasted Vegetables</div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Perfectly roasted vegetables with a touch of garlic and herbs.
              </p>
            </CardFooter>
          </Card>
          <Card className="group">
            <CardContent className="p-0">
              <img
                src="/placeholder.svg"
                alt="Recipe"
                width={400}
                height={300}
                className="object-cover w-full aspect-[4/3] rounded-t-lg group-hover:scale-105 transition-transform"
              />
            </CardContent>
            <CardFooter className="p-4 flex flex-col gap-2 justify-start">
              <div className="text-lg font-semibold">Creamy Risotto</div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Delicious and creamy risotto made with Arborio rice.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
