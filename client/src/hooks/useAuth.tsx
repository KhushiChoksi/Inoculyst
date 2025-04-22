import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//login authentication file
const useAuth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [accountType, setAccountType] = useState('');
    const navigate = useNavigate();


    //set and retrieve information upon log in. 
    const login = async () => {
        try {

            //get info from account
            const res = await axios.get("http://localhost:8080/account");
            const user = res.data.find( (acc) => acc.Username == username && acc.Password == password);

            //save in loal storage and redirect to dashboard
            if (user) {
                setAccountType(user.Account_type);
                localStorage.setItem('accountType', user.Account_type);
                localStorage.setItem('username', user.Username);
                localStorage.setItem('userID', user.ID);
                navigate('/dashboard')
                window.location.reload();
            }
            else {
                setErrorMessage("Invalid username or password.");
            }
        }
        catch (err) {
            console.error(err);
            setErrorMessage("Server error. Try again");
        }
        
    };

    return {
        username, 
        setUsername, 
        password, 
        setPassword, 
        errorMessage, 
        login,
        accountType,
    };
    
};
export default useAuth;