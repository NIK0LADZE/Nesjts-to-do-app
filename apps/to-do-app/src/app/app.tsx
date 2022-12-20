// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuestRoute from './GuestRoute/GuestRoute';
import Register from './Register/Register';
import SignIn from './SignIn/SignIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestRoute />,
    children: [
      {
        path: "/",
        element: <Register />
      },
      {
        path: "sign-in",
        element: <SignIn />
      }
    ]
  }
])

export function App() {
  return (<RouterProvider router={router} />);
}

export default App;
