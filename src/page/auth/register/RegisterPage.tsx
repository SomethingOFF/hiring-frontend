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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { registerUser } from "@/slices/userSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name cannot exceed 20 characters"),
    email: z
      .string()
      .min(1, "Enter your email address")
      .email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password should be greater than 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password should be greater than 6 characters"),
    resume: z.instanceof(File).optional(),
    company: z.string().optional(),
    role: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const hrValue = searchParams.get("HR");
  const dispatch: AppDispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.user);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: hrValue ? "HR" : "user",
      company: "",
    },
  });
  const router = useNavigate();
  const onSubmitHandler = (values: z.infer<typeof registerSchema>) => {
    dispatch(registerUser(values)).then(() => {
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Dohn Joe"
                        disabled={isLoading}
                      />
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
                        placeholder="Abc@#$123"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>ConfirmPassword</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Abc@#$123"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!hrValue && (
                <FormField
                  control={form.control}
                  name="resume"
                  render={() => (
                    <FormItem className="relative">
                      <FormLabel>Resume ({"PDF, < 5MB"})</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            const file = e.target.files
                              ? e.target.files[0]
                              : undefined;
                            form.setValue("resume", file);
                          }}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {hrValue && (
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="user">user</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {hrValue && (
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Compay name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Register Now!
                </Button>
                <Link to={"/auth/login"} className="block">
                  <Button
                    type="submit"
                    className="w-full"
                    variant={"outline"}
                    disabled={isLoading}
                  >
                    Login here!
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

export default RegisterPage;
