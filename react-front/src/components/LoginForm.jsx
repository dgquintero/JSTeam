import Logo from 'media/logo.svg'
import { consultarDocumentoDatabase, signGoogle, usuario } from './FirebaseInfo'
import { toast } from "react-toastify";
import { useHistory } from 'react-router';


const LoginForm = () => {

    let history = useHistory();


   


    const handleClick = async(e) => {        

        e.preventDefault()        
        signGoogle()     
        
        /* console.log(usuario.email);
        console.log(usuario.displayName);
        console.log(usuario.photoURL); */
        
        if(usuario?.uid){
            const usuarioDatabase = await consultarDocumentoDatabase('usuarios',usuario.uid)

            if(usuarioDatabase.estado !== "Autorizado") {
                toast.warning('Al usuario aun no se le ha asignado un rol',{position: "bottom-center"})         
            }  else{ 

                if(usuarioDatabase.rol === "Administrador")  {history.push('/admin') } 
                if(usuarioDatabase.rol === "Vendedor")  {history.push('/vendedor') }            

                
        }
            
    }
    
        

    }
    return (
        <div className='text-center'>
            <main className="form-signin">
                <form id="mainLogin">
                    <img className="mb-4" src={Logo} alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Ingreso al Sistema de Información</h1>

                    {/* <div className="form-floating">
                        <input type="text" className="form-control" id="name" placeholder="" required />
                        <label htmlFor="name">Nombre</label>
                    </div>

                    <div className="form-floating mb-4">
                        <input type="text" className="form-control" id="email" placeholder="" required />
                        <label htmlFor="name">Email</label>
                    </div>

                    <button className="w-100 btn btn-primary mb-3" type="submit" id="signUp">Registrarse</button> */}
                    <button className="w-100 btn btn-danger" type="button" id="googleBtn" onClick={handleClick}>Ingresar con Google</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                </form>
            </main>
        </div>
    )
}

export default LoginForm
