import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToDo } from '../Models/ToDoList.model';
import './ToDoList.scss';

export interface ToDoListProps {
    onLogout: React.Dispatch<React.SetStateAction<boolean>>
};

const ToDoListComponent = (props: ToDoListProps) => {
    const [toDoList, setToDoList] = useState<ToDo[]>([]);
    const [isEditingToDoId, setIsEditingToDoId] = useState<number | null>(null);
    const { id: userId, username } = JSON.parse(localStorage.getItem('user') || 'false');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const titleInput = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3000/to-do-list/${userId}`);

            const { toDoList } = await response.json();
            setToDoList(toDoList);
        })();
    }, [userId]);

    const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        const formData = Object.fromEntries(new FormData(event.currentTarget));
        const { title: titleFromForm } = formData;
        event.preventDefault();

        (async () => {
            const method = isEditingToDoId ? 'PATCH' : 'POST';
            const requestLink = isEditingToDoId
                ? `http://localhost:3000/to-do-list/${isEditingToDoId}`
                : 'http://localhost:3000/to-do-list';
            const response = await fetch(requestLink, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: Number(userId), ...formData })
            });

            const { toDo: { id = '', title = '' } = {}, message } = await response.json();

            if (!response.ok) {
                alert(message)
                return;
            }

            const listAfterCreate: ToDo[] = [...toDoList, { id, title }];
            const [toDoToBeUpdated]: ToDo[] = toDoList.filter(({ id }) => id === isEditingToDoId);
            const updatedToDo: ToDo = { ...toDoToBeUpdated, title: titleFromForm.toString() };
            const listWithoutToDoToBeUpdated: ToDo[] = toDoList.filter(({ id }) => id !== isEditingToDoId);
            const updatedList: ToDo[] = [...listWithoutToDoToBeUpdated, updatedToDo];
            updatedList.sort(({ id }, { id: nextId }) => id < nextId ? -1 : 1);
            const finalToDoList: ToDo[] = isEditingToDoId ? updatedList : listAfterCreate;
            if (isEditingToDoId) setIsEditingToDoId(null);
            setToDoList(finalToDoList);
            (event.target as HTMLFormElement).reset();
        })();
    }

    const editHandler = (toDoId: number) => {
        const { title = '' } = toDoList.find(({ id }) => id === toDoId) || {};

        if (isEditingToDoId === toDoId) {
            titleInput.current.value = '';
            setIsEditingToDoId(null);
            return;
        }

        titleInput.current.value = title;
        setIsEditingToDoId(toDoId);
    }

    const deleteHandler = (toDoId: number) => {
        (async () => {
            const response = await fetch(`http://localhost:3000/to-do-list/${toDoId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            const { message } = await response.json();

            if (!response.ok) {
                alert(message)
                return;
            }

            const listAfterDelete: ToDo[] = toDoList.filter(({ id }) => id !== toDoId);
            setToDoList(listAfterDelete);
        })();
    }

    const logoutHandler = () => {
        const { onLogout } = props;
        localStorage.removeItem('userId');
        onLogout(false);
    }

    const placeholder = isEditingToDoId ? 'Enter new value' : 'Enter what to do';

    return (
        <div className={'ToDoList'}>
            <div className={'ToDoList-Header'}>
                <span>User: {username}</span>
                <span onClick={logoutHandler}>Logout</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th colSpan={3}>What to do</th>
                    </tr>
                </thead>
                <tbody>
                    {toDoList.map((toDo) => {
                        const { id, title } = toDo;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{title}</td>
                                <td className='Button' onClick={() => editHandler(id)}>{isEditingToDoId === id ? 'Cancel' : 'Edit'}</td>
                                <td className='Button' onClick={() => deleteHandler(id)}>Delete</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <form className='ToDoList-Form' onSubmit={submitHandler}>
                <input ref={titleInput} type="text" name='title' placeholder={placeholder} />
                <button>{isEditingToDoId ? 'Update the list' : 'Add to list'}</button>
            </form>
            <Outlet />
        </div>
    )
}

export default ToDoListComponent;