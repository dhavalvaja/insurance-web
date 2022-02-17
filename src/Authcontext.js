import React,{useContext,useState,useEffect} from "react";
import { gprovider, auth } from './firebase'

const Authcontext = React.createContext();

export function useAuth(){
    return useContext(Authcontext)
}

export default function AuthProvider({ children }){
    const [currentUser,setCurrentUser] = useState()
    const [loading,setLoding] = useState(true)
  
    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function loginwithgoogle(){
        return auth.signInWithPopup(gprovider)
    }

    function logout(){
        return auth.signOut()
    }
    
    function resetpassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateemail(email){
        return currentUser.updateEmail(email)
    }

    function upadatepassword(password){
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoding(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        loginwithgoogle,
        logout,
        resetpassword,
        upadatepassword,
        updateemail
    }
    return(
        <Authcontext.Provider value={value}>
            {!loading && children}
        </Authcontext.Provider>
    )
}