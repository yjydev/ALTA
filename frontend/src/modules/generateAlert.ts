import { stringify } from 'querystring';
import Swal from 'sweetalert2';

import '../style/AlertStyle.css';
import { mainColor, whiteColor, blackColor, errorColor } from './colorChart';

export function generateCheck(title: string, text: string, callback: () => void | Promise<void> | null) {
  Swal.fire({
    title,
    text,
    showConfirmButton: true,
    icon: 'success',
    iconColor: mainColor,
    confirmButtonColor: mainColor,
    confirmButtonText: '확인',
    color: blackColor,
    background: whiteColor,
  }).then(() => {
    if (callback) callback();
  });
}

export function generateError(title: string, text: string, callback?: any) {
  Swal.fire({
    title,
    text,
    icon: 'error',
    iconColor: errorColor,
    color: blackColor,
    background: whiteColor,
    showConfirmButton: true,
    confirmButtonColor: errorColor,
    confirmButtonText: '돌아가기',
  }).then(() => {
    if (callback) callback();
  });
}

export function generateTimer(title: string, text: string) {
  Swal.fire({
    title,
    text,
    color: blackColor,
    iconColor: mainColor,
    background: whiteColor,
    allowOutsideClick: false,
    showCancelButton: false,
    timerProgressBar: true,
    didOpen: async () => {
      Swal.showLoading();
    },
  });
}

export function generateConfirm(
  title: string,
  text: string,
  subTitle: string,
  subText: string,
  callback: () => Promise<void> | null,
) {
  Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: mainColor,
    confirmButtonText: '확인',
    cancelButtonColor: errorColor,
    color: blackColor,
    background: whiteColor,
  }).then((result) => {
    if (result.isConfirmed) {
      if (callback) callback();
      Swal.fire({
        title: `${subTitle}`,
        text: `${subText}`,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonColor: mainColor,
        confirmButtonText: '확인',
        color: blackColor,
        background: whiteColor,
      });
    }
  });
}
