import React, {ReactElement, useState} from 'react';
import {IoMdFemale, IoMdMale} from "react-icons/io";
import {FieldValues, Path, UseFormSetValue} from "react-hook-form";

type GenderSelectionProps<T extends FieldValues> = {
    setValue: UseFormSetValue<T>;
    value? : "MALE" | "FEMALE";
    className?: string;
};
const GenderSelection = <T extends FieldValues, >({setValue,value='MALE',className=''}: GenderSelectionProps<T>) => {

    const [selectedSex, setSelectedSex] = useState<"MALE" | "FEMALE">(value);
    const handleSexChange = (gender: "MALE" | "FEMALE") => {
        setSelectedSex(gender);
        setValue('gender' as Path<T>, gender as T[Path<T>], { shouldValidate: true });
    };


    const renderRadioButton = (value: "MALE" | "FEMALE", icon: ReactElement) => (
        <label className=" inline-block">
            <input
                type="radio"
                name="sex"
                value={value}
                checked={selectedSex === value}
                onChange={() => handleSexChange(value)}
                className="hidden"
            />
            <span
                className={`rounded-lg ${
                    selectedSex === value ? 'text-primary-500 shadow-lg' : 'text-gray-600'
                }`}
            >
                {icon}
            </span>
        </label>
    );

    return (
        <div className={`flex h-10 items-center justify-around ${className}`}>            {renderRadioButton('MALE',
            <IoMdMale size={30}/>)}
            {renderRadioButton('FEMALE', <IoMdFemale size={30}/>)}
        </div>
    );
};

export default GenderSelection;
