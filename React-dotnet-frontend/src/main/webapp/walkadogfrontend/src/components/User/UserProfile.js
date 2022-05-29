import React from "react";
import {useParams} from 'react-router-dom';
import {Alert} from "react-bootstrap";

const UserProfile = () => {
    const params = useParams();
    console.log("UserProfile call")
    console.log(params)
    
return(
    <Alert style={{opacity: 0.9, padding: '50px',backgroundColor: 'cadetblue', color: "#ffffff", fontFamily: "Montserrat",
        fontWeight: "500px",textAlign: "center", fontSize:"28px"}}>Witaj  {params.id}</Alert>
)
}

export default UserProfile;