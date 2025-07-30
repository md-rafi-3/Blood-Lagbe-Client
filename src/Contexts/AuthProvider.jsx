import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from './AuthContext';




const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
   
 const [user,setUser]=useState(null)
 const [loading,setLoading]=useState(true)

    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const userLogin=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleLogin=()=>{
        return signInWithPopup(auth,provider)
    }

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("🚀 ~ unsubscribe ~ currentUser:", currentUser);

      setUser(currentUser);
      setLoading(false)
     

      
    });
    return () => {
      unsubscribe();
    };
  }, []);


  
    const updateUser=(updatedData)=>{
        setLoading(true);
        return updateProfile(auth.currentUser,updatedData)
    }


    const userSignOut=()=>{
        setLoading(true);
        return signOut(auth)
    }

    const userInfo={
        createUser,
        loading,
        user ,
        updateUser,
        userLogin,
        userSignOut,
        googleLogin


    }
    return (
      <AuthContext value={userInfo}>
       {children}
      </AuthContext>
    );
};

export default AuthProvider;
