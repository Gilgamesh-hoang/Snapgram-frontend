import React, {useEffect, useRef} from "react";
interface InfiniteScrollProps {
    children: React.ReactNode;
    loader: React.ReactNode;
    fetchMore: () => void;
    hasMore: boolean;
    endMessage?: React.ReactNode;
}
const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
                                                           children,
                                                           loader,
                                                           fetchMore,
                                                           hasMore,
                                                           endMessage,
                                                       }) => {
    const pageEndRef = useRef(null);
    useEffect(() => {
        if (hasMore) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) { // kiểm tra element có nằm trong viewport không?
                    fetchMore();
                }
            });

            if (pageEndRef.current) {
                observer.observe(pageEndRef.current);
            }

            return () => {
                if (pageEndRef.current) {
                    observer.unobserve(pageEndRef.current);
                }
            };
        }
    }, [hasMore]);
    return (
        <>
            {children}

            {hasMore ? <div ref={pageEndRef}>{loader}</div> : endMessage}
        </>
    );
};

export default InfiniteScroll;

