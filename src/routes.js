import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import SDashboardLayout from './layouts/SDashboardLayout';
import EDashboardLayout from './layouts/EDashboardLayout';
import MainLayout from './layouts/MainLayout';
import AccountView from './views/account/AccountView';
import CustomerListView from './views/customer/CustomerListView';
import EmployeeListView from './views/employee/EmployeeListView';
import StudentListView from './views/student/StudentListView';
import DashboardView from './views/reports/DashboardView';
import EmployeeDashboardView from './views/reports/EmployeeDashboardView';
import StudentDashboardView from './views/reports/StudentDashboardView';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import NotFoundView from './views/errors/NotFoundView';
import ProductListView from './views/product/ProductListView';
import SettingsView from './views/settings/SettingsView';
import HomePage from './views/homepage/Homepage'
import Auth from './auth'
import PasswordReset from './components/ForgotPassword/PasswordReset';
import Route from 'react-router-dom';

const isAuthenticated = Auth.isUserAuthenticated();
const routes = [
  { path: '/', element: <HomePage /> },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  {
    path: 'student',
    element: isAuthenticated ? <SDashboardLayout />: <Navigate to="/"/>,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <StudentDashboardView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'employee',
    element: isAuthenticated ? <EDashboardLayout />: <Navigate to="/"/>,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'employees', element: <EmployeeListView /> },
      { path: 'students', element: <StudentListView /> },
      { path: 'dashboard', element: <EmployeeDashboardView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: 'resetpassword/:token', element:  <PasswordReset /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
];


// const routes = (
//       <Route exact path="/" component={ HomePage } />
//   );

export default routes;
