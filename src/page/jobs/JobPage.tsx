import LayoutWrapper from "../LayoutWrapper";
import JobCard from "@/components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { getALlJobs } from "@/slices/jobSlice";
import DialogModel from "@/components/models/DialogModel";
import JobDetailsPage from "./JobDetailsPage";

const JobPage = () => {
  const [active, setActive] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { job } = useSelector((state: RootState) => state.jobs);
  useEffect(() => {
    dispatch(getALlJobs());
  }, []);
  return (
    <LayoutWrapper label="Jobs Posting">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pb-8">
        {job.map((job) => (
          <DialogModel
            active={active}
            onChange={() => setActive((prev) => !prev)}
            title={`job : ${job.name}`}
            description={`${job.company}`}
            Content={<JobDetailsPage setActive={setActive} job={job} />}
            key={job._id}
          >
            <JobCard data={job} />
          </DialogModel>
        ))}
      </div>
    </LayoutWrapper>
  );
};

export default JobPage;
