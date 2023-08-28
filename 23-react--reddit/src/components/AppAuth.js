import { useLoaderData } from 'react-router-dom';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AppAuth = (props) => {
    const authData = useLoaderData();

    const navigate = useNavigate();

    localStorage.setItem("access_token", JSON.stringify(authData.access_token))

    props.setHasGrantedAccess(true)

    useEffect(() => {
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 800);
      }, []);
};

export default AppAuth;
