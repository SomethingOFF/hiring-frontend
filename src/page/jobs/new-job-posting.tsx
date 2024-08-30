import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LayoutWrapper from "../LayoutWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { Link, useNavigate } from "react-router-dom";
import { createJob } from "@/slices/jobSlice";
import { ArrowLeft } from "lucide-react";

export const JobSchema = z.object({
  name: z.string().min(1, "Check out fields"),
  description: z.string().min(1, "Check out field"),
});

const JobPosting = () => {
  const dispatch: AppDispatch = useDispatch();
  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const router = useNavigate();
  const onSubmitHandler = (values: z.infer<typeof JobSchema>) => {
    dispatch(createJob(values)).then(() => {
      router("/dashboard");
    });
  };
  return (
    <LayoutWrapper>
      <div className="p-8 space-y-4">
        <div className="flex gap-4 w-full">
          <Link to={"/dashboard"}>
            <Button variant={"ghost"}>
              <ArrowLeft />
            </Button>
          </Link>
          <Heading title="Job Posting" />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Posting Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Posting Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the description"
                      {...field}
                      rows={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Post Now!</Button>
          </form>
        </Form>
      </div>
    </LayoutWrapper>
  );
};

export default JobPosting;
