import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function ErrorPage({
  statusCode = 404,
  message = "Page not found",
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-destructive">
            {statusCode}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <p className="text-lg text-gray-600">{message}</p>
          <p className="text-sm text-gray-500">
            Sorry, we couldn't find what you were looking for.
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          
          <Button onClick={() => window.location.reload()}>
            <ReloadIcon className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}