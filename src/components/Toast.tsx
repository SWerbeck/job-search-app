import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmationToast = () => {
  const handleConfirm = () => {
    // Perform the action you want on confirmation
    console.log('Action confirmed!');
  };

  const handleCancel = () => {
    // Do nothing or handle the cancellation
    console.log('Action cancelled.');
  };

  const showConfirmationToast = () => {
    toast.info(
      <div>
        <p>Are you sure?</p>
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={handleCancel}>No</button>
      </div>,
      {
        autoClose: false, // Keep the toast open until an action is taken
        closeOnClick: false, // Prevent closing on click outside the toast
        draggable: false, // Prevent dragging
        pauseOnHover: false, // Prevent pausing on hover
      }
    );
  };

  return (
    <div>
      <button onClick={showConfirmationToast}>Show Confirmation Toast</button>
    </div>
  );
};

export default ConfirmationToast;