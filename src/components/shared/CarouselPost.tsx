import React, {useState} from "react";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";
import {clsx} from "clsx";
import {MediaUrl} from "@/types";
import {ArrowLeftCircle, ArrowLeftCircleIcon, ArrowLeftSquare, ArrowLeftToLine} from "lucide-react";

type CarouselProps = {
    sources: MediaUrl[];
};
const CarouselPost: React.FC<CarouselProps> = ({sources}) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === sources.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? sources.length - 1 : slide - 1);
    };

    return (
        <div className="relative ">
            {sources.map((item, idx) => {
                return (
                    <div className='' key={idx}>
                        {item.isImage && (
                            <img
                                src={item.src}
                                alt={item.src}
                                key={idx}
                                className={clsx('post-card_img', {'hidden': slide !== idx})}
                            />
                        )}

                        {item.isVideo && (
                            <video
                                src={item.src}
                                className={clsx('post-card_img', {'hidden': slide !== idx})}
                                controls
                                muted
                            />
                        )}
                    </div>
                );
            })}
            <div className='absolute top-0 left-0 w-full h-full bg-transparent flex items-center justify-center'>

                <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left"/>
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
        </div>
    );
};
export default CarouselPost;