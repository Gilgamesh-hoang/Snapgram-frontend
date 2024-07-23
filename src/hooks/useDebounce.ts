import { useEffect, useState } from 'react';

function useDebounce (value:string, delay:number) {
    const [debounced, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler);
    }, [value]);

    return debounced;
}
export default useDebounce;