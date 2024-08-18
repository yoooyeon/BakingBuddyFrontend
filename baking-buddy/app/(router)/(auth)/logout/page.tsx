"use client";

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from "@/context/AuthContext";

const Logout = () => {
    const {logout} = useAuth();
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            await logout();
        };
        performLogout();
    }, [logout]);

    return null; // 이 페이지는 UI를 렌더링하지 않습니다.
};

export default Logout;
