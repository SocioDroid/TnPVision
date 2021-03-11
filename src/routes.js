import React from 'react';
import { Navigate } from 'react-router-dom'; 
import StudentDashboardLayout from './views/student/StudentDashboardLayout';
import EmployeeDashboardLayout from './views/employee/EmployeeDashboardLayout';
import InterviewerDashboardLayout from './views/Interviewer/InterviewerDashboardLayout';
import StudentAccountView from './views/student/StudentAccountView';
import EmployeeListView from './views/employee/EmployeeListView';
import StudentListView from './views/student/StudentListView';
import EmployeeDashboardView from './views/employee/EmployeeDashboardView';
import StudentDashboardView from './views/student/StudentDashboardView';
import InterviewerDashboardView from './views/Interviewer/InterviewerDashboardView';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import NotFoundView from './views/errors/NotFoundView';
import SettingsView from './views/settings/SettingsView';
import DriveView from './views/drive/DriveUpload/DriveUploadForm';
import DriveListView from './views/drive/DriveListView';
import CompanyView from './views/drive/CompanyListView';
import HomePage from './views/homepage/Homepage';
import Auth from './auth';
import PasswordReset from './views/auth/ForgotPassword/PasswordReset';
import ImportStudent from './views/employee/ImportStudent';
import EmployeeAccountView from './views/employee/EmployeeAccountView';
import InterviewerAccountView from './views/Interviewer/InterviewerAccountView'
import AfterDriveView from './views/drive/DriveUpload/AfterDriveUpload';
import StudentDriveView from './views/drive/StudentDriveView';
import EmployeeDriveView from './views/drive/EmployeeDriveView';
import InterviewerDrive from './views/Interviewer/InterviewerDashboardView/InterviewerDrive';
import StudentInformation from './views/Interviewer/InterviewerDashboardView/StudentInformation';
import EligibileDrive from './views/student/StudentDashboardView/EligibleDrives';
import VolunteerDrive from './views/student/StudentDashboardView/VolunteeringDrives';
import Index from "./cube/index";
import ExplorePage from './cube/pages/ExplorePage';
import DashboardPage from './cube/pages/DashboardPage';
import App from './cube/App';

const isAuthenticated = Auth.isUserAuthenticated();
const group = Auth.getGroup();
const dashboardRoute = "/" + Auth.getGroup() + "/dashboard";
const routes = [
  {
    path: '/',
    element: isAuthenticated  ? <Navigate to={dashboardRoute}/> : <HomePage />,
  },
  {
    path: 'student',
    element: isAuthenticated  ? group === 'student' ? <StudentDashboardLayout /> : <Navigate to={dashboardRoute}/> : <Navigate to="/" />,
    children: [
      { path: 'account', element: <StudentAccountView /> },
      { path: 'dashboard', element: <StudentDashboardView /> },
      { path: 'eligibledrive', element: <EligibileDrive /> },
      { path: 'volunteerdrive', element: <VolunteerDrive /> },
      { path: 'drive/:id', element: <StudentDriveView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> },
      {
        path: 'cube/explore', 
        element: <App children={<ExplorePage/>}/>,
      },    
      {
        path: 'cube/dashboard', 
        element: <App children={<DashboardPage/>}/>,
      }, 
    ]
  },
  {
    path: 'employee',
    element: isAuthenticated  ? group === 'employee' ? <EmployeeDashboardLayout /> : <Navigate to={dashboardRoute}/> : <Navigate to="/" />,
    children: [
      { path: 'empaccount', element: <EmployeeAccountView /> },
      { path: 'employees', element: <EmployeeListView /> },
      { path: 'students', element: <StudentListView /> },
      { path: 'dashboard', element: <EmployeeDashboardView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'drive', element: <DriveView /> },
      { path: 'companies', element: <CompanyView /> },
      { path: 'drives', element: <DriveListView /> },
      { path: 'afterdrive/:id', element: <AfterDriveView /> },
      { path: 'importstudent', element: <ImportStudent /> },
      { path: 'drive/:id', element: <EmployeeDriveView /> },
      { path: '*', element: <Navigate to="/404" /> },
      {
        path: 'cube/explore/:id', 
        element: <App children={<ExplorePage/>}/>,
      },    
      {
        path: 'cube/explore', 
        element: <App children={<ExplorePage/>}/>,
      },    
      {
        path: 'cube/dashboard', 
        element: <App children={<DashboardPage/>}/>,
      },    
    ]
  },
  {
    path: 'interviewer',
    element: isAuthenticated  ? group === 'interviewer' ? <InterviewerDashboardLayout /> : <Navigate to={dashboardRoute}/> : <Navigate to="/" />,
    children: [
      { path: 'account', element: <InterviewerAccountView /> },
      { path: 'dashboard', element: <InterviewerDashboardView /> },
      { path: 'drive', element: <InterviewerDrive /> },
      { path: 'studentinformation/:id/:roundId/', element: <StudentInformation />},
      { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  {
    path: '/',
    children: [
      {
        path: 'cube/explore', 
        element: <App children={<ExplorePage/>}/>,
      },    
      {
        path: 'cube/dashboard', 
        element: <App children={<DashboardPage/>}/>,
      },    
      {
        path: 'login', 
        element: isAuthenticated  ? <Navigate to={dashboardRoute}/> : <LoginView />,
      },    
      {
        path: 'register', 
        element: isAuthenticated  ? <Navigate to={dashboardRoute}/> : <RegisterView />,
      },
      {
        path: 'resetpassword/:token', 
        element: isAuthenticated  ? <Navigate to={dashboardRoute}/> : <PasswordReset />,
      },
      { path: 'logout', element: <Navigate to="/" />},
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
];


// const routes = (
//       <Route exact path="/" component={ HomePage } />
//   );

export default routes;
