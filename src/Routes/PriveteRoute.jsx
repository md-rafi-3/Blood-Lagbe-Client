import React, {  useContext } from 'react';
import { Navigate, useLocation} from 'react-router';
import Loading from '../Pages/Loading/Loading';
import { AuthContext } from '../Contexts/AuthContext';


const PriveteRoute = ({children}) => {
 
    const {user,loading}=useContext(AuthContext);
    const location=useLocation()
   

  if(loading){
    return <Loading></Loading>;
  }
    if(user && user?.email){
        return  children;
    }

    else{
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }

   
    
};

export default PriveteRoute;
