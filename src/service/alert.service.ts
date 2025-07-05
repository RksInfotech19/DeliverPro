import Swal from 'sweetalert2';

const AlertService = {
  confirmLogout: (): Promise<boolean> => {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7c1cb0', // violet
      cancelButtonColor: '#828282', // coral
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      background: '#fff',
    }).then((result) => result.isConfirmed);
  },

  showSuccess: (message: string) => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      confirmButtonColor: '#7c1cb0',
    });
  },

  showError: (message: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#f57547',
    });
  }
};

export default AlertService;
