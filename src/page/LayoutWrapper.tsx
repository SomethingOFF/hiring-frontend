import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { LayoutDashboard } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, redirect } from "react-router-dom";

const LayoutWrapper = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  if (!user?.role) {
    redirect("/auth/login");
    return;
  }
  return (
    <div className="h-full max-w-[1024px] mx-auto px-4 lg:px-8 space-y-4">
      {label && (
        <div className="h-16 flex items-center  justify-center w-full text-xl lg:text-2xl text-center font-medium underline underline-offset-4">
          {label}
        </div>
      )}
      <div>{children}</div>
      {user.role === "HR" && (
        <div className="fixed w-full bottom-0 h-16 flex items-center justify-center">
          <Link to={"/dashboard"}>
            <Button size={"icon"}>
              <LayoutDashboard />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LayoutWrapper;
