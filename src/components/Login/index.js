import {useState} from 'react' ;
import {Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import './index.css'

const Login = () =>{

    const [email , setEmail] = useState("") ; 
    const [password , setPassword] = useState("") ;
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate() ;

    const token = Cookies.get("jwt_token");

    if (token !== undefined) {
    return <Navigate to="/" replace />;
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        const userDetails = {email , password} ;

        const options = {
            method : 'POST' ,
            headers : {
                "Content-Type" : "application/json" , 
            }, 
            body : JSON.stringify(userDetails) ,
        }

        const response = await fetch('https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin', options );

        const data = await response.json() ;

        if(response.ok === true){
            Cookies.set('jwt_token' , data.data.token , {expires : 30}) ;
            navigate('/') ;
        }else{
            setErrorMsg(data.message) ;
        }
    };

    return( 
        <div className="login-container">
            <div className="login-card">
                <h1 className="logo">Go Business</h1>
                <p className="tagline">Sign in to open your referral dashboard</p>

                <form onSubmit={onSubmitForm}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                          id="email"
                          type="email"
                          value={email}
                          placeholder="you@example.com"
                          onChange={(e)=>setEmail(e.target.value)}                        
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e)=>setPassword(e.target.value)}                        
                        />
                    </div>

                    <button type="submit">Sign in</button>
                    {errorMsg && <p className="error-message">{errorMsg}</p>}
                </form>
            </div>
        </div>  
    )
}

export default Login
