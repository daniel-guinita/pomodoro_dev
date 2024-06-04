import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { PowerIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import QuestionImg from "@/assets/img/question-pana.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export default function LogoutPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Card>
        <CardHeader className="w-screen max-w-lg">
          <AspectRatio>
            <Image
              alt="Question"
              src={QuestionImg}
              fill
              className="object-cover"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
            className="space-y-8 flex flex-col items-center">
            <h1>Are you sure you want to logout?</h1>
            <Button>
              <PowerIcon className="w-6" />
              Sign Out
            </Button>
          </form>
          <CardFooter className="flex justify-center">
            <Link href="/" className="mt-8">
              <Button variant="link">Back to home</Button>
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
