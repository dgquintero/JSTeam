import LoginForm from "components/LoginForm";
import LoginToast from "components/LoginToast";

import 'styles/signin.css'

const Login = () => {
    return (
        <div className='login_container d-flex justify-content-center'>
            <LoginForm />
            <LoginToast />
        </div>
    )
}

export default Login
