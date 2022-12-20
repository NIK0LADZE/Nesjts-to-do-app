/* eslint-disable-next-line */
export interface SignInProps {};

export function SignIn(props: SignInProps) {
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    event.preventDefault();

    (async () => {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message)
        return;
      }

      (event.target as HTMLFormElement).reset();
      alert('Registration was successful!');
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
