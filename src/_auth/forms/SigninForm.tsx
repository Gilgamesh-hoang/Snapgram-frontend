import React from "react";

const SigninForm: React.FC = () => {
    return (
        <div>
            <h1>Signin</h1>
            <form>
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button>Signin</button>
            </form>
        </div>
    );
};

export default SigninForm;
