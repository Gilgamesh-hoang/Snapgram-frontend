import React from "react";
import {Loader} from "@/components/shared";
import {multiFormatDateString2} from "@/utils/dateUtil";
import {Link} from "react-router-dom";

const Notifies: React.FC = () => {

    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div className="common-container">
            <div className="flex w-full max-w-5xl flex-col items-start">
                <div className="mb-4 flex w-full max-w-5xl gap-2 ">
                    <img
                        src="/assets/icons/notify.svg"
                        width={36}
                        height={36}
                        alt="edit"
                        className="invert-white"
                    />
                    <h2 className="h3-bold md:h2-bold w-full text-left">Thông báo</h2>
                </div>
                {isLoading ? (
                    <Loader/>
                ) : (
                    <ul className='flex w-4/5 flex-col'>
                        <li className='rounded-2xl hover:bg-dark-3'>
                            <Link to={''} className='flex px-6 py-8'>
                                <div className='mr-3'>
                                    <img
                                        src={"/assets/icons/profile-placeholder.svg"}
                                        alt="user"
                                        className='w-28 rounded-full'
                                    />
                                </div>

                                <div>
                                    <span className='base-extrabold'>John Smith </span>
                                    <span className='base-light'>Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Accusamus alias commodi Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Accusamus alias commodi
                                    eos exercitationem fugiat iusto minima</span>
                                    <div className="flex-start mt-2 gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular">
                                            {multiFormatDateString2(new Date().toDateString())}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <hr className='h-px border-none bg-light-4'/>
                        </li>
                        <li className='rounded-2xl hover:bg-dark-3'>
                            <Link to={''} className='flex px-6 py-8'>
                                <div className='mr-3'>
                                    <img
                                        src={"/assets/icons/profile-placeholder.svg"}
                                        alt="user"
                                        className='w-28 rounded-full'
                                    />
                                </div>

                                <div>
                                    <span className='base-extrabold'>John Smith </span>
                                    <span className='base-light'>Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Accusamus alias commodi Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Accusamus alias commodi
                                    eos exercitationem fugiat iusto minima</span>
                                    <div className="flex-start mt-2 gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular">
                                            {multiFormatDateString2(new Date().toDateString())}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <hr className='h-px border-none bg-light-4'/>
                        </li>
                        <li className='rounded-2xl hover:bg-dark-3'>
                            <Link to={''} className='flex px-6 py-8'>
                                <div className='mr-3'>
                                    <img
                                        src={"/assets/icons/profile-placeholder.svg"}
                                        alt="user"
                                        className='w-28 rounded-full'
                                    />
                                </div>

                                <div>
                                    <span className='base-extrabold'>John Smith </span>
                                    <span className='base-light'>Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Accusamus alias commodi Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Accusamus alias commodi
                                    eos exercitationem fugiat iusto minima</span>
                                    <div className="flex-start mt-2 gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular">
                                            {multiFormatDateString2(new Date().toDateString())}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <hr className='h-px border-none bg-light-4'/>
                        </li>
                        <li className='rounded-2xl hover:bg-dark-3'>
                            <Link to={''} className='flex px-6 py-8'>
                                <div className='mr-3'>
                                    <img
                                        src={"/assets/icons/profile-placeholder.svg"}
                                        alt="user"
                                        className='w-28 rounded-full'
                                    />
                                </div>

                                <div>
                                    <span className='base-extrabold'>John Smith </span>
                                    <span className='base-light'>Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Accusamus alias commodi Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Accusamus alias commodi
                                    eos exercitationem fugiat iusto minima</span>
                                    <div className="flex-start mt-2 gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular">
                                            {multiFormatDateString2(new Date().toDateString())}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <hr className='h-px border-none bg-light-4'/>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};
export default Notifies;