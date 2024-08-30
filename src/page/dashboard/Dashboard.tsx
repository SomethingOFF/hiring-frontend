import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus } from "lucide-react";
import LayoutWrapper from "../LayoutWrapper";
import { Link } from "react-router-dom";
import JobCard from "@/components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Job } from "@/types";
import { useEffect } from "react";
import { getALlmyJobs } from "@/slices/jobSlice";
import { toast } from "sonner";

const Dashboard = () => {
  const { isError, job } = useSelector((state: RootState) => state.jobs);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getALlmyJobs());
  }, []);
  useEffect(() => {
    if (isError) {
      toast("something occred");
    }
  }, [isError]);
  return (
    <>
      <LayoutWrapper>
        <div className="flex items-center justify-between p-4 h-40">
          <div className="flex gap-4 w-full">
            <Link to={"/jobs"}>
              <Button variant={"ghost"}>
                <ArrowLeft />
              </Button>
            </Link>
            <Heading
              title={`Job Posting`}
              description="Managing Resume for jobs for Company"
            />
          </div>
          <Link to="/job/new">
            <Button onClick={() => {}}>
              <Plus className="mr-2 w-4 h-4" />
              add new
            </Button>
          </Link>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pb-8 my-4">
          {job?.map((job: Job) => (
            <JobCard
              data={job}
              key={job._id}
              href={`/dashboard/job/${job._id}`}
            />
          ))}
        </div>
       
        <Separator />
      </LayoutWrapper>
    </>
  );
};

export default Dashboard;
