import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getJob } from "@/slices/jobSlice";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import LayoutWrapper from "../LayoutWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Heading from "@/components/Heading";

const JobTable = () => {
  const { id } = useParams();
  console.log(id);
  if (!id) {
    return;
  }
  const { job } = useSelector((state: RootState) => state.job);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getJob({ id }));
  }, []);
  console.log(job);
  if (!job) {
    return <>No Job found!</>;
  }
  if (job.users && job.users.length === 0) {
    return <>No one applied yet</>;
  }
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
            <Heading title={`Job Posting (${job?.name})`} />
          </div>
        </div>
        <div className="py-4">
          <DataTable columns={columns} data={job.users} />
        </div>
      </LayoutWrapper>
    </>
  );
};

export default JobTable;
