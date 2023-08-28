import { useLoaderData } from 'react-router-dom';
import { Navigate } from 'react-router-dom';



const AppAuth = (props) => {
    const authData = useLoaderData();

    localStorage.setItem("access_token", JSON.stringify(authData.access_token))
    props.setHasGrantedAccess(true)

    return (
        <Navigate to="/random" />
    );
};

export default AppAuth;
