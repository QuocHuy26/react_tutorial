import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom'

const PrivateRoute = (props) => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.token === '') {
            navigate('/');
        }
    }, [user?.token, navigate]);
    
    if (user?.token === '') {
        return null;
    }

    return (
        <>
            {props.children}
        </>
)
}
export default PrivateRoute;