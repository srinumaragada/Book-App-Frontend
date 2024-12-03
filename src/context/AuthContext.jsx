import {  createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext=createContext()
 const provider= new GoogleAuthProvider();
export const useAuth=()=>{
    return useContext(AuthContext)
}


export const AuthProvide=({children})=>{
    const [currentUser, setCurrentUser] = useState(null)
    const [loading,setLoading] = useState(true)

   const googleSignUp=async()=>{
        return await signInWithPopup(auth, provider)
   }

    const login=async(email, password)=>{
        return await signInWithEmailAndPassword(auth, email, password)
    }
    const registerUser = async (email,password) => {

        return await createUserWithEmailAndPassword(auth, email, password);
    } 
    const logout = () => {
        return signOut(auth)
    }

    // manage user
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user) {
               
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                } 
            }
        })

        return () => unsubscribe();
    }, [])

    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user) {
               
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                } 
            }
        })

        return () => unsubscribe();
    }, [])


    const value={
        currentUser,
        loading,
        login,
        registerUser,
        googleSignUp,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
                {children}
        </AuthContext.Provider>
    )
}