import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from "axios";
import { API_URL } from "@/API";
import { Job } from "@/types";
import React from "react";
const JobDetailsPage = ({
  job,
  setActive,
}: {
  job: Job;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const onClickhandler = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const data = { jobId: job._id };
      await axios.put(`${API_URL}/job/apply`, data, config);
      setActive(false);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="p-8 space-y-4">
      <div className="text-lg sm:Text-xl lg:text2xl font-medium">
        {job.name} at {job.company}
      </div>
      <div className="space-y-2">
        <div className="text-sm sm:text-lg">description:</div>
        <div>{job.description}</div>
      </div>
      {user?.role !== "HR" && (
        <Button onClick={onClickhandler}>Apply now!</Button>
      )}
    </div>
  );
};

export default JobDetailsPage;
