import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import SDashboardLayout from './views/student/StudentDashboardLayout';
import EDashboardLayout from './views/employee/EmployeeDashboardLayout';
import IDashboardLayout from './views/Interviewer/InterviewerDashboardLayout';
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
import ImportStudent from './views/ImportStudent';
import EmployeeAccountView from './views/employee/EmployeeAccountView';
import InterviewerAccountView from './views/Interviewer/InterviewerAccountView'
import AfterDriveView from './views/drive/DriveUpload/AfterDriveUpload';
import StudentDriveView from './views/drive/StudentDriveView'
import EmployeeDriveView from './views/drive/EmployeeDriveView'
import InterviewerDrive from './views/Interviewer/InterviewerDashboardView/InterviewerDrive'
import StudentInformation from './views/Interviewer/InterviewerDashboardView/StudentInformation'

const isAuthenticated = Auth.isUserAuthenticated();
const group = Auth.getGroup();
const dashboardRoute = "/" + Auth.getGroup() + "/dashboard";
const routes = [
  {
    path: '/',
    element: isAuthenticated  ? <Navigate to={dashboardRoute}/> : <HomePage />,
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <StudentAccountView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  {
    path: 'student',
    element: isAuthenticated  ? group === 'student' ? <SDashboardLayout /> : <Navigate to={dashboardRoute}/> : <Navigate to="/" />,
    children: [
      { path: 'account', element: <StudentAccountView /> },
      { path: 'dashboard', element: <StudentDashboardView /> },
      { path: 'drive/:id', element: <StudentDriveView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'employee',
    element: isAuthenticated  ? group === 'employee' ? <EDashboardLayout /> : <Navigate to={dashboardRoute}/> : <Navigate to="/" />,
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
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'interviewer',
    element: isAuthenticated  ? group === 'interviewer' ? <IDashboardLayout /> : <Navigate to={dashboardRoute}/> : <Navigate to="/" />,
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
