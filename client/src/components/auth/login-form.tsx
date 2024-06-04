"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { authenticate } from "@/actions/auth/login.action";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

const handleSubmit = async (values: z.infer<typeof formSchema>) => {
  const error = await authenticate(values, "/");
  if (error) {
    toast.error(error);
  } else {
    toast.success("Successfully logged in");
  }
};

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="lg:w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="lg:w-full lg:mt-10">LOGIN</Button>
      </form>
    </Form>
  );
}
