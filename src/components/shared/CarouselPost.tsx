import React, {useState} from "react";
import {clsx} from "clsx";
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io";
import {MediaUrl} from "@/model/type.ts";

type CarouselProps = {
    sources: MediaUrl[];
};
const CarouselPost: React.FC<CarouselProps> = ({sources}) => {
    const [slide, setSlide] = useState(0);
    const [isShowArrow, setIsShowArrow] = useState(sources.length > 1);
    const isShowIndicator = sources[slide]?.type === 'IMAGE';

    const nextSlide = () => {
        setSlide(slide === sources.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? sources.length - 1 : slide - 1);
    };
    const renderIndicator = () => {
        return (
            <div className="indicators absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                {sources.map((_, idx) => (
                    <button
                        type="button"
                        key={idx}
                        className={clsx("indicator", {'indicator-inactive': slide !== idx})}
                        onClick={() => setSlide(idx)}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="relative ">
            {sources.map((item, idx) => {
                return (
                    <div className='' key={idx}>
                        {item.type === 'IMAGE' && (
                            <img
                                src={item.url}
                                alt={item.url}
                                key={idx}
                                className={clsx('post-card_img', {'hidden': slide !== idx})}
                            />
                        )}
                        {item.type === 'VIDEO' && (
                            <video
                                src={item.url}
                                className={clsx('post-card_img', {'hidden': slide !== idx})}
                                controls
                                muted
                            />
                        )}
                    </div>
                );
            })}

            {isShowArrow && (
                <>
                    <IoIosArrowDropleftCircle
                        onClick={prevSlide}
                        className="arrow arrow-left absolute left-4 top-1/2 -translate-y-1/2 text-light-2"
                    />
                    <IoIosArrowDroprightCircle
                        onClick={nextSlide}
                        className="arrow arrow-right absolute right-4 top-1/2 -translate-y-1/2"
                    />
                    {isShowIndicator && renderIndicator()}
                </>
            )}
        </div>
    );
};
export default CarouselPost;