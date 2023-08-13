import {useParams} from "react-router-dom";
//import {useState} from "react";

const User = () => {
    const {id} = useParams();

    //const [user, setUser] = useState({})

    return <>
        <h1>User Info {id}</h1>
    </>
}

export default User;