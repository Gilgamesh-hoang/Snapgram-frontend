import {Loader, UserCard} from "@/components/shared";
import React, {useState} from "react";
import {Button, Input} from "@/components/ui";
import {useInView} from "react-intersection-observer";
import {AiOutlineCloudUpload} from "react-icons/ai";


const AllUsers: React.FC = () => {
    const {ref, inView} = useInView();
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchValue, setSearchValue] = useState("");

    const creator = {
        $id: "1",
        name: "John Doe",
        username: "john_doe",
        imageUrl: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
    };

    return (
        <div className="common-container">
            <div className="user-container">
                <h2 className="h3-bold md:h2-bold w-full text-left">Người dùng</h2>

                <div className="flex w-full">
                    <form className="mr-8 flex w-full gap-1 rounded-lg bg-dark-4">
                        <img className='mx-4'
                             src="/assets/icons/search.svg"
                             width={24}
                             height={24}
                             alt="search"
                        />
                        <Input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="explore-search w-full "
                            value={searchValue}
                            onChange={(e) => {
                                const {value} = e.target;
                                setSearchValue(value);
                            }}
                        />
                    </form>
                    <div className=''>
                        <Button type='button' className='h-full' title='Tải ảnh'>
                            <AiOutlineCloudUpload size={25}/>
                        </Button>
                    </div>
                </div>

                {isLoading ? (
                    <Loader/>
                ) : (
                    <ul className="user-grid">
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                        <li key={creator?.$id} className="w-full min-w-[200px] flex-1  ">
                            <UserCard user={creator}/>
                        </li>
                    </ul>
                )}
            </div>

            {/*{!searchValue && (*/}
            {/*    <div ref={ref} className="mt-10">*/}
            {/*        <Loader/>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default AllUsers;