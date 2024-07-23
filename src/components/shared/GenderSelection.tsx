import React, {ReactElement, useState} from 'react';
import {IoMdFemale, IoMdMale} from "react-icons/io";
import {UseFormSetValue} from "react-hook-form";
import {SignupValidation} from "@/validation";
import {z} from "zod";

type GenderSelectionProps = {
    setValue: UseFormSetValue<z.infer<typeof SignupValidation>>;
};
const GenderSelection: React.FC<GenderSelectionProps> = ({setValue}) => {
    const [selectedSex, setSelectedSex] = useState<"MALE" | "FEMALE">('MALE');

    const handleSexChange = (value: "MALE" | "FEMALE") => {
        setSelectedSex(value);
        setValue('gender', value, {shouldValidate: true})
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
        <div className="flex h-10 items-center justify-around">
            {renderRadioButton('MALE', <IoMdMale size={30}/>)}
            {renderRadioButton('FEMALE', <IoMdFemale size={30}/>)}
        </div>
    );
};

export default GenderSelection;
