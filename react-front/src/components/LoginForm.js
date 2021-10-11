import Logo from '../logo.svg'
import '../signin.css'

const LoginForm = () => {
    return (
        <div className='text-center'>
            <main className="form-signin">
                <form id="mainLogin">
                    <img className="mb-4" src={Logo} alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Ingreso al Sistema de Informacion</h1>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="name" placeholder="" required />
                        <label htmlFor="name">Nombre</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="email" className="form-control" id="email" placeholder="" required />
                        <label htmlFor="name">Email</label>
                    </div>
                    <button className="w-100 btn btn-primary mb-3" type="submit" id="signUp">Registrarse</button>
                    <button className="w-100 btn btn-danger" type="button" id="googleBtn">Ingresar con Google</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                </form>
            </main>
        </div>
    )
}

export default LoginForm
