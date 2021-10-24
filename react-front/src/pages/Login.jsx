import LoginForm from "components/LoginForm";
import background from "../media/shoebg4.jpg"

import 'styles/signin.css'

const Login = () => {
    return (
        <div className='login_container d-flex justify-content-center'
            style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
            <LoginForm />
        </div>
    )
}

export default Login
