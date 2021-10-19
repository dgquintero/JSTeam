import Logo from 'media/logo.svg'
import { useRef } from 'react'
import { auth, provider, userRef } from './FirebaseInfo'
import ToastNotification from './ToastNotification';

// Firebase imports
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { query, where, setDoc, getDocs, doc } from "firebase/firestore";

const LoginForm = () => {

    const emailRef = useRef();
    const nameRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user exists by check email
        // There is probably a better way to do this
        const q = query(userRef, where("email", "==", emailRef.current.value));
        const qData = await getDocs(q);
        let userExists = false;
        qData.forEach((doc) => {
            console.log(doc.id);
            userExists = true
        })

        if (!userExists) {
            console.log(userExists);
            // New user ref
            const newUserRef = doc(userRef);
            // Adding new user
            setDoc(newUserRef, {
                nombre: nameRef.current.value,
                email: emailRef.current.value,
                estado: 'Pendiente',
                rol: 'No Asignado'
            });
            // Show notification on success -TO DO
            alert('It works')

        } else {
            console.log(userExists);
            // Show notification on failure - TO DO
            alert('It doesnt')
        }

        //Reset fields
        e.target.reset();
    }

    // TO DO
    const handleGoogleSignIn = (params) => {
        signInWithRedirect(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    return (
        <div className='text-center'>
            <main className="form-signin">
                <form id="mainLogin" onSubmit={handleSubmit}>
                    <img className="mb-4" src={Logo} alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Ingreso al Sistema de Información</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" ref={nameRef} id="name" placeholder="" required />
                        <label htmlFor="name">Nombre</label>
                    </div>

                    <div className="form-floating mb-4">
                        <input type="text" className="form-control" ref={emailRef} id="email" placeholder="" required />
                        <label htmlFor="name">Email</label>
                    </div>

                    <button className="w-100 btn btn-primary mb-3" type="submit" id="signUp">Registrarse</button>
                    <button className="w-100 btn btn-danger" type="button" id="googleBtn" onClick={handleGoogleSignIn}>Ingresar con Google</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                </form>
            </main>
        </div>
    )
}

export default LoginForm
