import React, {useState} from "react";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";
import {IoClose} from "react-icons/io5";
import {clsx} from "clsx";
import {MediaUrl} from "@/components/shared/FileUploader.tsx";

type CarouselProps = {
    sources: MediaUrl[];
    callback?: (itemIndex: number) => void;
    isShowClose?: boolean;
};
const Carousel: React.FC<CarouselProps> = ({sources, callback, isShowClose = false}) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === sources.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? sources.length - 1 : slide - 1);
    };

    const useCallback = (index: number) => {
        if (index === sources.length - 1)
            prevSlide();
        if(callback)
            callback(index);
    }

    return (
        <div className="carousel">
            <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left"/>

            {sources.map((item, idx) => {
                return (
                    <div className='relative' key={idx}>
                        {item.isImage && (
                            <img
                                src={item.src}
                                alt={item.src}
                                key={idx}
                                className={clsx('slide', {'hidden': slide !== idx})}
                            />
                        )}

                        {item.isVideo && (
                            <video
                                src={item.src}
                                className={clsx('slide', {'hidden': slide !== idx})}
                                controls
                                muted
                            />
                        )}


                        {isShowClose &&
                            <div onClick={() => useCallback(idx)}
                                 className={clsx('absolute right-1 top-1 w-fit cursor-pointer rounded-full bg-dark-4 p-2',
                                     {'hidden': slide !== idx})}>
                                <IoClose className='lg:size-6'/>
                            </div>
                        }
                    </div>
                );
            })}

            <BsArrowRightCircleFill onClick={nextSlide} className="arrow arrow-right"/>

            <span className="indicators">
                {sources.map((_, idx) => {
                    return (
                        <button
                            type='button'
                            key={idx}
                            className={
                                slide === idx ? "indicator" : "indicator indicator-inactive"
                            }
                            onClick={() => setSlide(idx)}
                        ></button>
                    );
                })}
            </span>
        </div>
    );
};
export default Carousel;