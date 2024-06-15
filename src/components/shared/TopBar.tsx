import {Link} from "react-router-dom";

import {Button} from "@/components/ui/button";

const TopBar = () => {


    return (
        <section className="topbar">
            <div className="flex-between px-5 py-4">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={130}
                        height={325}
                    />
                </Link>

                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        className="shad-button_ghost">
                        <img src="/assets/icons/logout.svg" alt="logout" />
                    </Button>
                    <Link to={`/profile/1`} className="flex-center gap-3">
                        <img
                            src={"/assets/icons/profile-placeholder.svg"}
                            alt="profile"
                            className="size-8 rounded-full"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TopBar;