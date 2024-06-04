import LoginForm from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <div className="w-screen h-screen flex">
      <div className="lg:w-[1115px] lg:h-full bg-gray-500"></div>
      <div className="lg:w-[810px] lg:h-full lg:p-10 lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-3">
        <div>
          <h2 className="lg:text-[70px]">Login</h2>
        </div>
        <div className="lg:w-full lg:h-[5px] lg:bg-[#ffcc00]"></div>
        <LoginForm />
        <span>or</span>
        <span>
          Don't have an account?{" "}
          <Button asChild variant="link">
            <Link href="register">Register</Link>
          </Button>
        </span>
        <footer>
          <p>
            Copyright &copy; <span>TechnoDynamic</span> 2024.
          </p>
        </footer>
      </div>
    </div>
  );
}
