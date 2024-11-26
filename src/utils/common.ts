import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {routes} from "@/route";
import {confirmDialog} from "primereact/confirmdialog";
import Swal from "sweetalert2";

export const showConfirmDialog = (message: string, header: string, icon: string, acceptAction: () => void, rejectAction?: () => void) => {
    confirmDialog({
        message,
        header,
        icon,
        defaultFocus: 'accept',
        acceptLabel: 'Đồng ý',
        rejectLabel: 'Hủy',
        accept: acceptAction,
        reject: rejectAction,
    });
};

export function generateProfileLink(nickname: string): string {
    return `${routes.profile.replace(':nickname/*', encodeURIComponent(nickname))}`;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function showAlert(type: 'success' | 'error', title: string, timeout = 1500, mess = "") {
    Swal.fire({
        icon: type,
        title,
        text: mess,
        showConfirmButton: false,
        timer: timeout
    });
}