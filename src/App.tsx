import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./page/home/HomePage";
import LoginPage from "./page/auth/login/LoginPage";
import JobPage from "./page/jobs/JobPage";
import AuthWrapper from "./page/AuthWrapper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { getmyUser } from "./slices/userSlice";
import RegisterPage from "./page/auth/register/RegisterPage";
import Dashboard from "./page/dashboard/Dashboard";
import JobPosting from "./page/jobs/new-job-posting";
import JobTable from "./page/dashboard/JobTable";

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getmyUser());
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<AuthWrapper protectedRoute />}>
            <Route path="/jobs" element={<JobPage />} />
          </Route>

          <Route element={<AuthWrapper protectedRoute isAdmin />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<AuthWrapper protectedRoute isAdmin />}>
            <Route path="/job/new" element={<JobPosting />} />
          </Route>
          <Route element={<AuthWrapper protectedRoute isAdmin />}>
            <Route path="/dashboard/job/:id" element={<JobTable />} />
          </Route>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
