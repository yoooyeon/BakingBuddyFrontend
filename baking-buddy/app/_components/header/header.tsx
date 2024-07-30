"use client";

import { useState, useEffect } from "react";
import { parseCookies } from 'nookies';
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Search from "../search/search";

type SearchIconProps = React.SVGProps<SVGSVGElement>;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 페이지가 렌더링될 때 쿠키를 읽어옵니다.
    const cookies = parseCookies();
    console.log("All cookies:", cookies); // 디버깅을 위해 콘솔에 쿠키를 출력합니다.
    const token = cookies.accessToken;
    console.log("token", token);
    setIsLoggedIn(!!token); // token이 존재하면 true, 그렇지 않으면 false로 설정합니다.
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-background shadow">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold" prefetch={false}>
          BakingBuddy
        </Link>
        <nav className="hidden space-x-4 md:flex">
          {isLoggedIn ? (
            <>
              <Link href="/recipes/register" className="hover:text-primary" prefetch={false}>
                레시피 등록하기
              </Link>
              <Link href="/recipes/users" className="hover:text-primary" prefetch={true}>
                내 레시피
              </Link>
              <Link href="/logout" className="hover:text-primary" prefetch={true}>
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-primary" prefetch={false}>
                로그인
              </Link>
              <Link href="/signup" className="hover:text-primary" prefetch={false}>
                회원가입
              </Link>
            </>
          )}
          <Link href="/search" className="hover:text-primary" prefetch={false}>
            <Search />
          </Link>
        </nav>
        {isLoggedIn && (
          <div className="flex items-center space-x-4">
            <Link href="/alarms" className="hover:text-primary" prefetch={false}>
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/alarm.png" />
              </Avatar>
            </Link>
            <Link href="/mypage" className="hover:text-primary" prefetch={false}>
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

const SearchIcon: React.FC<SearchIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};

export default Header;
