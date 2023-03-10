import { useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ACCESS_TOKEN } from './constants';
import GuestRoute from './GuestRoute/GuestRoute';
import Register from './Register/Register';
import SignIn from './SignIn/SignIn';
import ToDoListComponent from './ToDoList/ToDoList';

const ToDoRouteObject = (setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>) => ({
  path: "/",
  element: <ToDoListComponent onLogout={ setIsSignedIn } />,
  children: [
    {
      path: "sign-in",
      element: <Navigate to={'/'} />
    }
  ]
});

const GuestRouteObject = (setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>) => ({
  path: "/",
  element: <GuestRoute />,
  children: [
    {
      path: "/",
      element: <Register />
    },
    {
      path: "sign-in",
      element: <SignIn onSignIn={ setIsSignedIn } />
    }
  ]
});

const router = (isSignedIn: boolean, setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>) => createBrowserRouter([
  { ...(isSignedIn ? ToDoRouteObject(setIsSignedIn) : GuestRouteObject(setIsSignedIn)) }
])

export function App() {
  const access_token = localStorage.getItem(ACCESS_TOKEN);
  const [isSignedIn, setIsSignedIn] = useState(!!access_token);
  return (<RouterProvider router={router(isSignedIn, setIsSignedIn)} />);
}

export default App;
