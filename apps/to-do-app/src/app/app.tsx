import { useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import GuestRoute from './GuestRoute/GuestRoute';
import Register from './Register/Register';
import SignIn from './SignIn/SignIn';
import ToDoList from './ToDoList/ToDoList';

const ToDoRouteObject = (setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>) => ({
  path: "/",
  element: <ToDoList onLogout={ setIsSignedIn } />,
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
  const { id: userId } = JSON.parse(localStorage.getItem('user') || 'false');
  const [isSignedIn, setIsSignedIn] = useState(!!userId);
  return (<RouterProvider router={router(isSignedIn, setIsSignedIn)} />);
}

export default App;
