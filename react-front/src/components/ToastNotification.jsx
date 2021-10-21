// import { ToastContainer, toast } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// About props on this componenet
// type: info success warning error 
// messege: any string
// position: top-left top-right top-center bottom-left bottom-right bottom-center

function ToastNotification({ type, message, position }) {

    return (
        <div>
            {() => toast(message, {
                position: position,
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })}
        </div>
    )
}

ToastNotification.defaultProps = {
    type: 'success',
    message: 'Default Message',
    position: 'top-center'
}

export default ToastNotification
