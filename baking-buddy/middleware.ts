import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;

    // 로그인이 필요한 페이지를 설정
    const loginRequiredPaths = ['/recipes/register', '/mypage', '/alarms', '/recipes/users'];

    // 요청 URL이 로그인이 필요한 경로인지 확인
    const requiresAuth = loginRequiredPaths.some(path => request.nextUrl.pathname.startsWith(path));

    if (!token && requiresAuth) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 로그인 상태에서 접근 제한 페이지로 리디렉션
    const loginPagePaths = ['/login', '/signup'];
    const isAuthPage = loginPagePaths.some(path => request.nextUrl.pathname.startsWith(path));

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
