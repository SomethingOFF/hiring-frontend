import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { format } from "date-fns";
import { Job } from "@/types";
const JobCard = ({ data, href }: { data: Job; href?: string }) => {
  return (
    <>
      {href ? (
        <Link to={href}>
          <Card className="hover:bg-secondary transition-all">
            <CardHeader>
              <div className="text-lg font-medium sm:text-xl lg:text-2xl">
                {data.name}
              </div>
              <div>By {data.company}</div>
            </CardHeader>
            <CardContent>
              <div className="line-clamp-3">{data.description}</div>
            </CardContent>
            <CardFooter className="pt-4">
              {format(data.createdAt, "MM/dd/yyyy")}
            </CardFooter>
          </Card>
        </Link>
      ) : (
        <Card className="hover:bg-secondary transition-all">
          <CardHeader>
            <div className="text-lg font-medium sm:text-xl lg:text-2xl">
              {data.name}
            </div>
            <div>By {data.company}</div>
          </CardHeader>
          <CardContent>
            <div className="line-clamp-3">{data.description}</div>
          </CardContent>
          <CardFooter className="pt-4">
            {format(data.createdAt, "MM/dd/yyyy")}
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default JobCard;
