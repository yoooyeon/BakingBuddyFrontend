"use client"
import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {API_URL} from '@/app/constants';
import {useRouter} from "next/navigation";

interface LoginRequestDto {
    username: string;
    password: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    login: (username: string, password: string) => void;
    logout: () => void;
    setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch(`${API_URL}/api/auth/status`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const result = await response.json();
                    const data = result.data;
                    console.log(data)
                    const isAuth = data.authenticated;
                    console.log("isAuth",isAuth)
                    const role = data.roleType;
                    setRole(role);
                    setIsLoggedIn(isAuth);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setIsLoggedIn(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (username: string, password: string) => {
        const loginRequestDto: LoginRequestDto = {
            username: username,
            password: password
        };

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginRequestDto),
                credentials: 'include', // 쿠키 포함
            });

            if (!response.ok) {
                throw new Error('로그인 실패');
            } else {
                const json = await response.json();
                const data = json.data
                const role = data.roleType;
                alert("login" + role)

                setIsLoggedIn(true);
                setRole(role);
                return json;
            }


        } catch (error) {
            console.error('로그인 오류:', error);
            throw error;
        }
    };


    const logout = async () => {
        try {
            const response = await fetch(`${API_URL}/api/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                // localStorage에서 사용자 정보 제거
                localStorage.removeItem('username');
                // localStorage.removeItem('accessToken');
                // localStorage.removeItem('refreshToken');
                setIsLoggedIn(false)

                // 로그아웃 후 로그인 페이지로 리다이렉트
                router.push('/login');
            } else {
                console.error('Failed to log out');
                router.push('/error');
            }
        } catch (error: any) {
            console.error('Logout error:', error);
            router.push('/error');
        }
    };


    return (
        <AuthContext.Provider value={{isLoggedIn, role, setIsLoggedIn, setRole, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
