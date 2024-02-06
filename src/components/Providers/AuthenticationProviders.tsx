import React, {createContext, useEffect, useRef, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import jwt from "jsonwebtoken";
import {Session} from "next-auth";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {IPlayers} from "@/utils/interfaces/players/players";

export const AuthContext = createContext<IAuthProps>({
    authStatus: "loading",
    userData: {},
});

export interface IAuthProps {
    authStatus: AuthStatus;
    userData: IPlayers | {};
}

type AuthStatus = "loading" | "unauthenticated" | "authenticated";

export default function AuthenticationProviders({children}: { children: React.ReactNode }) {
    const {data: sessionData, status} = useSession();
    
    const router = useRouter();

    const toastLoginStatus = useRef<any>();

    const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
    const [userData, setUserData] = useState({});
    const handleCheckAccountInDatabase = async () => {

        const provider = localStorage.getItem("authProvider") || 'none'
        console.log(provider)

        return await axios.get(`/api/auth/player?email=${sessionData?.user?.email}&provider=${provider}`)
            .then(response => response.data)
            .then(response => {
                if (response.status === 204) {
                    return handleCreateNewAccount(sessionData!, provider);
                } else {
                    setUserData(response.data[0])
                }
                return response.data[0]
            })

    }

    const handleCreateNewAccount = async (profileData: Session, provider: string) => {
        const {user} = profileData;

        return await axios.post("/api/players", {
                fullName: user!.name,
                email: user!.email,
                avatar: user!.image,
                provider: provider,
            })
            .then(response => response.data)
            .then(response => {
                try {
                    console.log(response.data)
                    if (response.data) {
                        setUserData(response.data[0])
                        return response.data[0];
                    }
                } catch (err) {
                    throw err;
                }

            })
    }

    const handleVerifyToken = (jwtToken: string) => {
        axios.post("/api/auth/player", {
            jwtToken
        }).then(response => response.data)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem("userData", JSON.stringify(response.data))
                    setAuthStatus("authenticated")
                    setUserData(response.data);
                } else if (response.status === 301) {
                    setAuthStatus("unauthenticated")
                    localStorage.removeItem("userData");
                    localStorage.removeItem("jwtToken");
                    toast.update(toastLoginStatus.current, {
                        render: response.message,
                        type: "error",
                        autoClose: 1000,
                        onClose: () => {
                            signOut({callbackUrl: "/auth"});
                        }
                    })

                }
            })
    }

    useEffect(() => {
        toastLoginStatus.current = toast.info("Waiting for status...", {autoClose: false});
        if (status === "authenticated") {
            toast.update(toastLoginStatus.current, {
                type: "success",
                render: "Logged in successfully",
                autoClose: 1000,
            });
        } else {
            toast.update(toastLoginStatus.current, {
                type: "error",
                render: "Unauthenticated",
                autoClose: 1000,
            });
        }
    }, [status]);

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            if (sessionData && status === "authenticated") {
                new Promise((resolve, reject) => {
                    handleCheckAccountInDatabase()
                        .then((response) => {
                            axios.post("/api/auth/player", {
                                playerId: response.playerId
                            }).then((response) => response.data)
                                .then(response => {
                                    const {newToken} = response.data;
                                    localStorage.setItem("jwtToken", newToken);
                                    handleVerifyToken(newToken);

                                })
                        })
                })
            } else {
                setAuthStatus("unauthenticated")
            }
        } else {
            handleVerifyToken(jwtToken)
        }

    }, [sessionData, status])

    return (
        <AuthContext.Provider value={{authStatus, userData}}>
            {children}
        </AuthContext.Provider>
    )
}