import React, {useRef} from "react";
import {QRCodeSVG} from "qrcode.react";
import * as htmlToImage from 'html-to-image';
import {saveAs} from 'file-saver';

interface QRCodeProps {
    nickname: string;
}

const QRCode: React.FC<QRCodeProps> = ({nickname}) => {
    const divRef = useRef(null);
    const currentUrl = window.location.href;
    const downloadImage = () => {
        if (divRef.current) {
            htmlToImage.toBlob(divRef.current)
                .then(function (blob) {
                    saveAs(blob, 'qrcode.png');
                });
        }
    }

    return (
        <div className='flex flex-col justify-center md:flex-row '>
            <div ref={divRef}
                 className='flex flex-col items-center justify-start rounded-xl border-[20px] border-white'>
                <QRCodeSVG
                    value={currentUrl.replace("/qr","")}
                    size={300}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"M"}
                    marginSize={0}
                    imageSettings={{
                        src: "/assets/icons/favicon.ico",
                        x: undefined,
                        y: undefined,
                        height: 40,
                        width: 40,
                        opacity: 1,
                        excavate: true,
                    }}
                />
                <p className="w-[300px] bg-white pt-[15px] text-center text-2xl font-extrabold text-dark-2">
                  <span style={{
                      background: 'linear-gradient(to right top, rgb(39, 196, 245), rgb(163, 7, 186))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                  }}>
                    {nickname}
                  </span>
                </p>
            </div>
            <div className='mt-10 flex justify-center md:ml-20 md:items-center'>
                <button className='min-h-10 rounded-lg bg-primary-500 px-3 py-1.5 hover:bg-primary-600'
                        onClick={downloadImage}>Tải mã QR
                </button>
            </div>
        </div>

    );
}

export default React.memo(QRCode);