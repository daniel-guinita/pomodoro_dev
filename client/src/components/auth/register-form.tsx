"use client";
import { register } from "@/actions/auth/register.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const courseEnum = z.enum(["BS Computer Science", "BS Information Technology"]);
const yearLevelEnum = z.enum([
  "First Year",
  "Second Year",
  "Third Year",
  "Fourth Year",
]);

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: "First Name is required!",
  }),
  last_name: z.string().min(1, {
    message: "Last Name is required!",
  }),
  username: z.string().min(1, {
    message: "Username is required!",
  }),
  email: z.string().min(1, {
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
  confirmPassword: z.string().min(1, {
    message: "Confirm Password is required!",
  }),
  course: courseEnum,
  year: yearLevelEnum,
  role: z.string(),
});

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await register(values);
    if (!result.message) {
      toast.success("Successfully Registered");
      router.push("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="lg:w-full lg:flex lg:flex-col lg:gap-4"
      >
        <div className="lg:w-full lg:flex lg:justify-center lg:items-center lg:gap-3">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="lg:w-full">
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="lg:w-full">
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="lg:w-full lg:flex lg:justify-center lg:items-center lg:gap-3">
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem className="lg:w-full">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BS Computer Science">
                      BS Computer Science
                    </SelectItem>
                    <SelectItem value="BS Information Technology">
                      BS Information Technology
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="lg:w-full">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Year Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="First Year">First Year</SelectItem>
                    <SelectItem value="Second Year">Second Year</SelectItem>
                    <SelectItem value="Third Year">Third Year</SelectItem>
                    <SelectItem value="Fourth Year">Fourth Year</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="lg:w-full lg:mt-10"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          REGISTER
        </Button>
      </form>
    </Form>
  );
}
