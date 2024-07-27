import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-background shadow">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold" prefetch={false}>
          BakingBuddy
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link href="/recipedetail" className="hover:text-primary" prefetch={false}>
            레시피 상세 조회 예시
          </Link>
          <Link href="/login" className="hover:text-primary" prefetch={false}>
            로그인
          </Link>
          <Link href="/signup" className="hover:text-primary" prefetch={false}>
            회원가입
          </Link>
          {/* <Link href="/recipes/users/${user.id}" className="hover:text-primary" prefetch={true}> */}
          <Link href="/recipes/users/1" className="hover:text-primary" prefetch={true}>
            내 레시피
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {/* 검색 아이콘 */}
          <Link href="/search" className="hover:text-primary" prefetch={false}>
            <SearchIcon className="h-6 w-6" />
          </Link>

          {/* 프로필 아이콘*/}
          <Link href="/mypage" className="hover:text-primary" prefetch={false}>
            <Avatar className="h-8 w-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </Link>

        </div>
      </div>
    </header>
  );
};

function SearchIcon(props: any) {
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
}

export default Header;
