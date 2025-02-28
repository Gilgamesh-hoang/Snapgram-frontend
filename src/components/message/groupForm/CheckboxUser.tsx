import React, {FC, useState} from "react";
import UserItem from "@/components/message/groupForm/UserItem.tsx";
import {User} from "@/model/type.ts";
import clsx from "clsx";

interface CheckBoxUserProps {
    user: User;
    onClick?: (user: User) => void;
    isChecked?: boolean;
}

const CheckboxUser: FC<CheckBoxUserProps> = ({user, onClick, isChecked = false}) => {
    const [checked, setChecked] = useState(isChecked);
    const handleClick = () => {
        if (onClick) {
            onClick(user);
            setChecked(!checked);
        }
    }

    return (
        <div className="relative mb-4 flex items-center gap-3">
            <label
                htmlFor={`checkbox-${user.id}`} onClick={handleClick}
                className="relative flex size-7 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-[#4158D0] via-[#C850C0] to-[#FFCC70] p-1 duration-100 hover:p-1.5"
            >
                <input type="checkbox" className="group peer hidden" id={`checkbox-${user.id}`}
                       checked={checked} onChange={(event) => setChecked(event.target.checked)}/>
                <label
                    htmlFor={`checkbox-${user.id}`}
                    className={clsx("size-full rounded-full bg-black", {"peer-checked:size-0": checked})}
                ></label>
                <div
                    className={clsx("absolute left-[10px] top-[14px] h-[2px] w-[15px] -translate-y-10 translate-x-10 rotate-[-50deg] rounded-sm bg-white duration-300 ",
                        {"peer-checked:translate-x-0 peer-checked:translate-y-0": checked})}
                ></div>
                <div
                    className={clsx("absolute left-[5px] top-[15px] h-[2px] w-[10px] -translate-x-10 -translate-y-10 rotate-45 rounded-sm bg-white duration-300",
                        {"peer-checked:translate-x-0 peer-checked:translate-y-0": checked})}
                ></div>
            </label>
            <UserItem user={user}/>

        </div>
    );
};

export default CheckboxUser;