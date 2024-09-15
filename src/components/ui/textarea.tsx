import * as React from "react"
import {useEffect, useState} from "react"

import {cn} from "@/utils/common.ts"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    formOption?: {
        callback: (name:string, value:string, option:object)=>void,
        name: string,
        options: object,
    },
    initValue?: string,

}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({className, formOption,initValue='', ...props}, ref) => {
        const [numCharacters, setNumCharacters] = useState<number>(0)
        const [value, setValue] = useState<string>(initValue)

        useEffect(() => {
            setNumCharacters(initValue.length);
        }, []);

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const newValue = e.target.value;
            setValue(newValue);
            setNumCharacters(newValue.length);

            if(formOption) {
                formOption.callback(formOption.name, newValue, formOption.options);
            }
        };
        return (
            <div className='relative'>
                <textarea
                    className={cn(
                        "flex min-h-[80px] w-full rounded-md border border-slate-200 px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
                        className
                    )}
                    ref={ref}
                    {...props}
                    value={value}
                    onChange={handleChange}
                />
                <p className='small-regular absolute bottom-[-26px] right-0 italic text-gray-500'>{numCharacters}/{props.maxLength}</p>
            </div>
        )
    }
)
Textarea.displayName = "Textarea"

export {Textarea}
