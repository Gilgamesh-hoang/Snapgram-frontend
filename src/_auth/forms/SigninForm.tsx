import React from "react";
import {useToast} from "@/components/ui/toast/use-toast.ts";

const SigninForm: React.FC = () => {
    const { toast } = useToast();

    const testToast = () => {
        toast({
            title: "Test Toast",
            description: "This is a test toast",
            variant: "default",
        });
    }
    return (
        <div>
            <h1 className=''>Signin</h1>
            <form>
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
            </form>
            <button onClick={testToast}>Signin</button>
        </div>
    );
};

export default SigninForm;
