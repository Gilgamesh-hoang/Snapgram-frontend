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
export function isUUID(str: string | undefined): boolean {
    if (!str) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
}

export function generateProfileLink(nickname: string): string {
    return `${routes.profile.replace(':nickname/*', encodeURIComponent(nickname))}`;
}

export function generatePostLink(id: string): string {
    return `${routes.posts.replace(':id', id)}`;
}

export function generateMessageLink(type: 'u'|'g', conversationId:string, query?:string): string {
    query = query || '';
    return `${routes.messages}/${type}/${conversationId}?${query}`;
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
export function showAlertOnLeft(type: 'success' | 'error', title: string, timeout = 1500) {
    return Swal.fire({
        position: "top-end",
        icon: type,
        title,
        showConfirmButton: false,
        timer: timeout
    });
}