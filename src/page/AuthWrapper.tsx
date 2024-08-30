import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getmyUser } from "@/slices/userSlice";

interface AuthWrapperProps {
  isAdmin?: boolean;
  protectedRoute?: boolean;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  isAdmin = false,
  protectedRoute = false,
}) => {
  const { isError, user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getmyUser());
  }, []);

  useEffect(() => {
    if (isError || (protectedRoute && !user && isError)) {
      navigate("/auth/login");
    }
    if (isError || (protectedRoute && isAdmin && user?.role !== "HR")) {
      navigate("/auth/login");
    }
  }, [isError, user, isAdmin, protectedRoute, navigate]);

  if (isError || !user || (protectedRoute && isAdmin && user?.role !== "HR")) {
    return null;
  }

  return <Outlet />;
};

export default AuthWrapper;
