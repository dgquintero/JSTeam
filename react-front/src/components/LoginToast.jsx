import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginToast() {
    const notify = () => toast('Hello');
    
    return (
        <div>
            <button onClick={notify}>Notification</button>
            <ToastContainer />
        </div>
    )
}

export default LoginToast
