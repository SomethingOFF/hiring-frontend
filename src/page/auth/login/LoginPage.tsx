import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cat } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { loginUser } from "@/slices/userSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "enter the password"),
});

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const hrValue = searchParams.get("HR");
  const dispatch: AppDispatch = useDispatch();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLoading = form.formState.isLoading;
  const router = useNavigate();
  const onSubmitHandler = (values: z.infer<typeof loginSchema>) => {
    dispatch(loginUser(values)).then(() => {
      router("/jobs");
    });
  };
  return (
    <div className="max-w-[1024px] mx-auto flex items-center justify-center h-full">
      <div className="w-full h-full flex items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-4 sm:min-w-[400px] sm:max-w-[500px] sm:mx-auto px-4 "
          >
            <div className="flex items-center justify-center gap-4 h-14">
              <Cat className="w-8 h-8" />
              <div className="text-lg sm:text-xl lg:text-2xl font-medium">
                Welcome to Home
              </div>
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="abc@gmail.com"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="abc123"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Login Now!
                </Button>
                <Link
                  to={`/auth/register${hrValue ? "/?HR=true" : ""}`}
                  className="block"
                >
                  <Button
                    type="submit"
                    className="w-full"
                    variant={"outline"}
                    disabled={isLoading}
                  >
                    Register here!
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
