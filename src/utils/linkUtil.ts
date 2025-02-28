import {FileType} from "@/model/type.ts";

//try separating string from URL
//ignoring localhost and IP address atm
const splitWithURLs = (str: string) => {
    const regex = new RegExp(
        '(' +
        '(?:https://www\\.|http://www\\.|https://|http://)?' + //protocol being http or https, with or without www
        '[A-Za-z0-9-]{2,}' + //domain name (or subdomain if the below one catches)
        '(?:\\.[A-Za-z0-9-]{2,})?' + //true domain name after subdomain
        '(?:\\.[A-Za-z0-9]{2,})' + //top level domain (second level if the below catches)
        '(?:\\.[A-Za-z0-9]{2,})?' + //true top level domain
        '(?:/\\S+)?' + //path and stuff
        ')',
        'gm'
    );
    return str.split(regex);
};

const isValidURL = (str: string): boolean => {
    try {
        // eslint-disable-next-line no-new
        new URL(str);
        return true;
    } catch (err) {
        return false;
    }
};

const isFacebookURL = (str: string): boolean => {
    return str.startsWith('https://www.facebook.com/');
};

const isInstagramURL = (str: string): boolean => {
    return str.startsWith('https://www.instagram.com/');
};

const isLinkedInURL = (str: string): boolean => {
    return str.startsWith('https://www.linkedin.com/');
};

const isTwitterURL = (str: string): boolean => {
    return str.startsWith('https://twitter.com/');
};

const isYoutubeURL = (str: string): boolean => {
    return str.startsWith('https://www.youtube.com/');
};

const isCloudinaryURL = (str: string): FileType | null => {
    if (!isValidURL(str)) return null;
    const url = import.meta.env.VITE_REACT_APP_CLOUDINARY_URL_RESPONSE;
    if (!url) return null;

    if (str.startsWith(url)) {
        const result = {isImage: false, isVideo: false};
        const extension = str.split('.').pop()?.toLowerCase();
        // extend is image
        if (
            extension === 'png' ||
            extension === 'jpg' ||
            extension === 'jpeg' ||
            extension === 'gif' ||
            extension === 'webp'
        ) {
            result.isImage = true;
            return result;
        } else if (
            extension === 'mp4' ||
            extension === 'mp3' ||
            extension === 'webm' ||
            extension === 'ogg'
        ) {
            result.isVideo = true;
            return result;
        }
    }
    return null;
};
export {isValidURL, isCloudinaryURL, splitWithURLs, isFacebookURL, isInstagramURL, isLinkedInURL, isTwitterURL, isYoutubeURL};
