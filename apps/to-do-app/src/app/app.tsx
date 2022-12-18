// eslint-disable-next-line @typescript-eslint/no-unused-vars
import classes from './app.module.scss';
import Register from './Register/Register';

export function App() {
  const { formContainer } = classes;

  return (
    <div className={ formContainer }>
      <Register />
    </div>
  );
}

export default App;
