import React from "react";

const SignupForm: React.FC = () => {

    return (
        <div>
            <h1>Signup</h1>
            <form>
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Confirm Password"/>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupForm;
