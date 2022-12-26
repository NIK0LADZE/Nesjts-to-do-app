import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToDoList } from '../Models/ToDoList.model';
import './ToDoList.scss';

export interface ToDoListProps {
    onLogout: React.Dispatch<React.SetStateAction<boolean>>
};

const ToDoListComponent = (props: ToDoListProps) => {
    const [toDoList, setToDoList] = useState<ToDoList[]>([]);
    const { id: userId, username } = JSON.parse(localStorage.getItem('user') || 'false');

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3000/to-do-list/${userId}`);

            const { toDoList } = await response.json();
            setToDoList(toDoList);
        })();
    }, [userId]);

    const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        const formData = Object.fromEntries(new FormData(event.currentTarget));
        event.preventDefault();

        (async () => {
            const response = await fetch('http://localhost:3000/to-do-list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: Number(userId), ...formData })
            });

            const { toDo: { id = '', title = '' } = {}, message } = await response.json();

            if (!response.ok) {
                alert(message)
                return;
            }

            setToDoList([...toDoList, { id, title }]);
            (event.target as HTMLFormElement).reset();
        })();
    }

    const deleteHandler = (toDoId: number) => {
        (async () => {
            const response = await fetch(`http://localhost:3000/to-do-list/${userId}/${toDoId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            const { message } = await response.json();

            if (!response.ok) {
                alert(message)
                return;
            }

            const listAfterDelete: ToDoList[] = toDoList.filter(({ id }) => id !== toDoId);
            setToDoList(listAfterDelete);
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
                        <th>#</th>
                        <th colSpan={ 3 }>What to do</th>
                    </tr>
                </thead>
                <tbody>
                    {toDoList.map((toDo) => {
                        const { id, title } = toDo;
                        return (
                            <tr key={ id }>
                                <td>{ id }</td>
                                <td>{ title }</td>
                                <td className='Button'>Edit</td>
                                <td className='Button' onClick={ () => deleteHandler(id)}>Delete</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <form className='ToDoList-Form' method="post" onSubmit={submitHandler}>
                <input type="text" name='title' placeholder='Enter what to do' />
                <button>Add to list</button>
            </form>
            <Outlet />
        </div>
    )
}

export default ToDoListComponent;