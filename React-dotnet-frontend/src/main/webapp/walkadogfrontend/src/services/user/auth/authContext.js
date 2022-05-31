import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({
    auth: null,
    setAuth: () => {},
    username: null,
    isTrainer: null,
    id: null
  });

  //export useAuth = () => useContext(AuthContext);

  const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const [username, setUser] = useState(null);
    const [isTrainer, setTrainer] = useState(null);
    const [id, setId] = useState(null);
  
    // useEffect(() => {
    //     const isAuth = async () => {
    //         try{
    //             const res await axios.get('',
    //             {withCredentials: true}
    //             );
    //             setUser(res.data)
    //         }
    //     }
    // })

}

