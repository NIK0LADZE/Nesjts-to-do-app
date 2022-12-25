import { Outlet } from 'react-router-dom';
import './ToDoList.scss';

export interface ToDoListProps {
  onLogout: React.Dispatch<React.SetStateAction<boolean>>
};

const ToDoList = (props: ToDoListProps) => {
    const { id: userId, username } = JSON.parse(localStorage.getItem('user') || 'false');
    const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        const formData = Object.fromEntries(new FormData(event.currentTarget));
        event.preventDefault();

        (async () => {
            const response = await fetch('http://localhost:3000/to-do-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: Number(userId), ...formData})
            });

            const { message } = await response.json();

            if (!response.ok) {
                alert(message)
                return;
            }

            (event.target as HTMLFormElement).reset();
        })();
    }

    const logoutHandler = () => {
        const { onLogout } = props;
        localStorage.removeItem('userId');
        onLogout(false);
    }

    return (
        <div className={'ToDoList'}>
            <div className={'ToDoList-Header'}>
                <span>User: { username }</span>
                <span onClick={ logoutHandler }>Logout</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>What to do</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <form className='ToDoList-Form' method="post" onSubmit={ submitHandler }>
                <input type="text" name='title' placeholder='Enter what to do' />
                <button>Add to list</button>
            </form>
            <Outlet />
        </div>
    )
}

export default ToDoList;