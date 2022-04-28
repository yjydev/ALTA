import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import '../style/AlertStyle.css';
import { mainColor, wightColor, blackColor, errorColor } from './colorChart';

const swal = withReactContent(Swal);

export function generateCheck(title: string, text: string) {
  swal
    .fire({
      title,
      text,
      showConfirmButton: true,
      icon: 'success',
      confirmButtonColor: mainColor,
      confirmButtonText: '확인',
      color: blackColor,
      background: wightColor,
    })
    .then((res) => {
      console.log('end');
    });
}

export function generateError(title: string, text: string) {
  swal
    .fire({
      title,
      text,
      color: blackColor,
      background: wightColor,
      showConfirmButton: true,
      confirmButtonColor: errorColor,
      confirmButtonText: '돌아가기',
      icon: 'error',
    })
    .then((res) => {
      console.log('end');
    });
}

export function generateTimer(title: string, text: string) {
  swal.fire({
    title,
    text,
    color: blackColor,
    background: wightColor,
    allowOutsideClick: false,
    showCancelButton: false,
    timerProgressBar: true,
    didOpen: async () => {
      swal.showLoading();
    },
  });
}
