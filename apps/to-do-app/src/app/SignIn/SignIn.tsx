import { useNavigate } from "react-router-dom";

/* eslint-disable-next-line */
export interface SignInProps {
  onSignIn: React.Dispatch<React.SetStateAction<boolean>>
};

export function SignIn(props: SignInProps) {
  const navigate = useNavigate();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    const { onSignIn } = props;
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    event.preventDefault();

    (async () => {
      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const { id, username, message } = await response.json();

      if (!response.ok) {
        alert(message)
        return;
      }

      onSignIn(true);
      navigate('/');
      localStorage.setItem('user', JSON.stringify({ id, username }));
      (event.target as HTMLFormElement).reset();
      alert(message);
    })();
  }

  return (
    <form method='post' onSubmit={ submitHandler }>
      <input className='form-control' type='text' name='username' placeholder='Enter your username' />
      <input className='form-control' type='password' name='password' placeholder='Enter your password' />
      <button>Sign in</button>
    </form>
  );
}

export default SignIn;
