"use client";
import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import {MagnifyingGlassIcon, BellIcon, UserIcon} from '@heroicons/react/24/outline';
import Search from '../search/search';
import {useRouter} from 'next/navigation';
import {API_URL} from '@/app/constants';
import Alarm from '../alarm/alarm';
import styles from '@/css/header.module.css';
import {useAuth} from '@/context/AuthContext';

interface AlarmType {
    id: number;
    msg: string;
    type: string;
    read: boolean;
}

const Header = () => {
    const {isLoggedIn, role, setIsLoggedIn} = useAuth();
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [alarmOpen, setAlarmOpen] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [alarms, setAlarms] = useState<AlarmType[]>([]);
    const [hasUnreadAlarms, setHasUnreadAlarms] = useState<boolean>(false);

    const alarmRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    console.log("header:", role)
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch(`${API_URL}/api/auth/status`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const result = await response.json();
                    const status = result.data.isAuthenticated;
                    setIsLoggedIn(status);
                } else {
                    if (response.status === 401) {
                        try {
                            const response = await fetch(`${API_URL}/api/refresh-token`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                            });
                            const json = await response.json();
                            const data = json.data;
                            setIsLoggedIn(true);
                            router.push("/");
                        } catch (error) {
                            console.error('Token refresh failed:', error);
                            return null;
                        }
                    }
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setIsLoggedIn(false);
            }
        };

        checkAuthStatus();
    }, [router]);

    useEffect(() => {
        if (isLoggedIn) {
            const fetchAlarms = async () => {
                try {
                    const response = await fetch(`${API_URL}/api/alarms/users`, {
                        method: 'GET',
                        credentials: 'include',
                    });
                    if (response.ok) {
                        const result = await response.json();
                        const alarmsData: AlarmType[] = result.data;
                        setAlarms(alarmsData);
                        setHasUnreadAlarms(alarmsData.some(alarm => !alarm.read));
                    } else {
                        console.error('Error fetching alarms:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching alarms:', error);
                }
            };
            fetchAlarms();
        }
    }, [isLoggedIn]);

    return (
        <header className="sticky top-0 z-10 bg-background shadow">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="text-2xl font-bold" prefetch={false}>
                    Recipe Diary
                </Link>
                <div className="mr-auto flex space-x-4">
                    <Link href="/" className="hover:text-primary" prefetch={false}>
                        팔로잉
                    </Link>
                    <Link href="/recipes" className="hover:text-primary" prefetch={false}>
                        레시피
                    </Link>
                    <Link href="/products" className="hover:text-primary" prefetch={false}>
                        상품
                    </Link>
                </div>
                <nav className="flex items-center space-x-4">
                    {!isLoggedIn && (
                        <>
                            <Link href="/login" className="hover:text-primary" prefetch={false}>
                                로그인
                            </Link>
                            <Link href="/signup" className="hover:text-primary" prefetch={false}>
                                회원가입
                            </Link>
                        </>
                    )}
                    <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-primary">
                        <MagnifyingGlassIcon className="h-6 w-6"/>
                        <span className="sr-only">Search</span>
                    </button>
                    {isLoggedIn && (
                        <div className="relative flex items-center space-x-4">
                            <button onClick={() => setAlarmOpen(!alarmOpen)} className="relative">
                                <BellIcon className="h-6 w-6 hover:text-primary"/>
                                {hasUnreadAlarms && (
                                    <span
                                        className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                                )}
                                <span className="sr-only">Notifications</span>
                                {alarmOpen && (
                                    <div ref={alarmRef}
                                         className="absolute right-0 top-8 w-72 bg-white border border-gray-200 rounded shadow-lg z-20">
                                        <Alarm alarms={alarms} setAlarmOpen={setAlarmOpen}/>
                                    </div>
                                )}
                            </button>
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="hover:text-primary"
                                >
                                    <UserIcon className="h-8 w-8"/>
                                </button>
                                {menuOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-20">
                                        <Link
                                            href="/mypage"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            내 프로필
                                        </Link>
                                        {role === 'ADMIN' && (
                                            <>
                                                <Link
                                                    href="/admin/reports"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    신고 관리하기
                                                </Link>
                                                <Link
                                                    href="/admin/authorities"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    권한 관리하기
                                                </Link>
                                            </>

                                        )}
                                        {role === 'EDITOR' && (
                                            <>
                                                <Link
                                                    href="/recipes/users"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    내 레시피
                                                </Link>
                                                <Link
                                                    href="/recipes/register"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    레시피 등록하기
                                                </Link>
                                            </>

                                        )}
                                        {role === 'SELLER' && (
                                            <>
                                                <Link
                                                    href="/products/users"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    내 상품
                                                </Link>
                                                <Link
                                                    href="/products/register"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    onClick={() => setMenuOpen(false)}
                                                >
                                                    상품 등록하기
                                                </Link>
                                            </>
                                        )}
                                        <Link
                                            href="/logout"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            로그아웃
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </nav>
            </div>
            {searchOpen && <Search setSearchOpen={setSearchOpen}/>}
        </header>
    );
};

export default Header;
