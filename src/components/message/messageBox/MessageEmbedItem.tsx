import {isFacebookURL, isInstagramURL, isLinkedInURL, isTwitterURL, isValidURL, isYoutubeURL,} from '@/utils/linkUtil';

import {FacebookEmbed, InstagramEmbed, LinkedInEmbed, XEmbed, YouTubeEmbed,} from 'react-social-media-embed';
import React from 'react';
import ReactPlayer from 'react-player';

const MessageEmbedItem = (
    {url, width, height}: { url: string, width: string | number, height: string | number }) => {
    if (!isValidURL(url)) return (<></>);

    //Facebook, Instagram, LinkedIn, Pinterest, TikTok, X (Twitter), and YouTube in React.
    const isFacebook = isFacebookURL(url);
    const isInstagram = isInstagramURL(url);
    const isLinkedIn = isLinkedInURL(url);
    const isTwitter = isTwitterURL(url);
    const isYoutube = isYoutubeURL(url);
    return (
        <>
            {/*{isFacebook && <FacebookEmbed url={url} width={width} height={height}/>}*/}  {/* occur error */}
            {isInstagram && <InstagramEmbed url={url} width={width}/>}
            {isLinkedIn && <LinkedInEmbed url={url} width={width} height={height}/>}
            {isTwitter && <XEmbed url={url} width={width}/>}
            {isYoutube && <YouTubeEmbed url={url} width={width} height={height}/>}
            {
                !isFacebook
                &&
                !isInstagram && !isLinkedIn && !isTwitter && !isYoutube && ReactPlayer.canPlay(url) &&
                <ReactPlayer url={url} width={width} height={height}/>}
        </>
    );
};
export default MessageEmbedItem;