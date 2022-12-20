import { NavLink, Outlet } from 'react-router-dom';
import './GuestRoute.scss';

const GuestRoute = () => {
    return (
        <div className={ 'formContainer' }>
        <div className={ 'Menu' }>
            <NavLink className={({ isActive }) => isActive ? 'Link Link-Active' : 'Link' } to={'/'}>Sign Up</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'Link Link-Active' : 'Link' } to={'/sign-in'}>Sign In</NavLink>
        </div>
        <Outlet />
      </div>
    )
}

export default GuestRoute;