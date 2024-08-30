import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="max-w-[1024px] mx-auto h-full flex items-center justify-center">
      <div className="flex items-center justify-between">
        <Homecard
          label="Are you looking for a job!"
          buttonLabel="Hunt Now!"
          buttonHref="/jobs"
        />
        <Separator
          orientation="vertical"
          className="hidden sm:block w-[2px] h-80"
        />
        <Homecard
          label="Are you looking for a Employees!"
          buttonLabel="Login now!"
          buttonHref="/auth/login?HR=true"
        />
      </div>
    </div>
  );
};

const Homecard = ({
  label,
  buttonLabel,
  buttonHref,
}: {
  label: string;
  buttonLabel: string;
  buttonHref: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full p-16">
      <div className="text-lg sm:text-xl lg:text-2xl font-medium">{label}</div>
      <Link to={buttonHref}>
        <Button>{buttonLabel}</Button>
      </Link>
    </div>
  );
};

export default HomePage;
