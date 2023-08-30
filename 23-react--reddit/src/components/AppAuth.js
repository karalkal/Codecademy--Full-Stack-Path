import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AppAuth = (props) => {
  const authData = useLoaderData();

  const navigate = useNavigate();

  // Warning: Cannot update a component (`App`) while rendering a different component (`AppAuth`).
  // The problem is when one component queues an update in another component, while the first component is rendering. 
  // Fix: Move the dispatch inside useEffect.
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("access_token", JSON.stringify(authData.access_token))

      navigate('/', { replace: true });
    }, 800);
  }, []);
};

export default AppAuth;
