import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({
    auth: null,
    setAuth: () => {},
    username: null
  });

  export const useAuth = () => useContext(AuthContext);

  const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const [username, setUser] = useState(null);
    const [id, setId] = useState(null);
  
    useEffect(() => {
        const isAuth = async () => {
            try{
                const res = await axios.get('',
                {withCredentials: true}
                );
                setUser(res.data);
            } catch(error) {
              setUser(null);
            };
        };
        isAuth();
    }, [auth]);

    return(
      <AuthContext.Provider value = {{auth, setAuth, user}}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;

