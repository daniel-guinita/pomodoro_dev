import RegisterForm from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RegisterPage() {
  return (
    <div>
      <div className="w-screen h-screen flex">
        <div className="lg:w-[1115px] lg:h-full bg-gray-500"></div>
        <div className="lg:w-[810px] lg:h-full lg:p-10 lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-3">
          <div>
            <h2 className="lg:text-[70px]">Register</h2>
          </div>
          <div className="lg:w-full lg:h-[5px] lg:bg-[#ffcc00]"></div>
          <RegisterForm />
          <span>or</span>
          <span>
          Already have an account?{" "}
            <Button asChild variant="link">
              <Link href="login">Login</Link>
            </Button>
          </span>
          <footer>
            <p>
              Copyright &copy; <span>TechnoDynamic</span> 2024.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
