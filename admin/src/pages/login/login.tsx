import { useState } from "react";

export function LoginPage() {
    const [Username, setUsername] = useState<string>('');
    const [Pasword, setPasword] = useState<string>('');

    const sendLogin = () => {
        fetch(`http://0.0.0.0:4550/admin/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                login: Username,
                password: Pasword
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            });
    }
    return (
        <>
            <main>
                <div className="flex flex-col space-y-4 items-center w-full">
                    <p className="text-2xl">
                        Login page
                    </p>
                    <div className=" w-[50%]">
                        <div className="flex flex-col space-y-1 w-full">
                            <p className="text-lg">Username</p>
                            <input onChange={(e) => setUsername(e.target.value)} className="bg-indigo-700 rounded-xl w-full h-[30px]" type="text" />
                        </div>
                        <div className="flex flex-col space-y-1 w-full">
                            <p className="text-lg">Password</p>
                            <input onChange={(e) => setPasword(e.target.value)} className="bg-indigo-700 rounded-xl w-full h-[30px]" type="text" />
                        </div>
                    </div>
                    <div>
                        <button className="w-20 h-[30px] bg-green rounded-xl hover:scale-95 hover:bg-opacity-90 active:scale-90 active:bg-opacity-80" onClick={sendLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}