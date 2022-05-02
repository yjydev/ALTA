import Swal from 'sweetalert2';

import '../style/AlertStyle.css';
import { mainColor, wightColor, blackColor, errorColor } from './colorChart';

export function generateCheck(title: string, text: string) {
  Swal.fire({
    title,
    text,
    showConfirmButton: true,
    icon: 'success',
    iconColor: mainColor,
    confirmButtonColor: mainColor,
    confirmButtonText: '확인',
    color: blackColor,
    background: wightColor,
  }).then(() => {
    console.log('end');
  });
}

export function generateError(title: string, text: string) {
  Swal.fire({
    title,
    text,
    icon: 'error',
    iconColor: errorColor,
    color: blackColor,
    background: wightColor,
    showConfirmButton: true,
    confirmButtonColor: errorColor,
    confirmButtonText: '돌아가기',
  }).then(() => {
    console.log('end');
  });
}

export function generateTimer(title: string, text: string) {
  Swal.fire({
    title,
    text,
    color: blackColor,
    iconColor: mainColor,
    background: wightColor,
    allowOutsideClick: false,
    showCancelButton: false,
    timerProgressBar: true,
    didOpen: async () => {
      Swal.showLoading();
    },
  });
}
