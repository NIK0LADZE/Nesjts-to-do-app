import { useNavigate } from "react-router-dom";
import { fetchHelper } from "../Utils/fetchHelper";

/* eslint-disable-next-line */
export interface RegisterProps {};

export function Register(props: RegisterProps) {
  const navigate = useNavigate();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    event.preventDefault();

    (async () => {
      const response = await fetchHelper({
        fetchUrl: '/api/users',
        method: 'POST',
        formData
      })

      const { message } = await response.json();

      if (!response.ok) {
        alert(message)
        return;
      }

      (event.target as HTMLFormElement).reset();
      navigate('sign-in');
      alert(message);
    })();
  }

  return (
    <form method='post' onSubmit={ submitHandler }>
      <input className='form-control' type='text' name='username' placeholder='Enter your username' />
      <input className='form-control' type='password' name='password' placeholder='Enter your password' />
      <input className='form-control' type='password' name='passwordConfirm' placeholder='Repeat your password' />
      <button>Sign up</button>
    </form>
  );
}

export default Register;
