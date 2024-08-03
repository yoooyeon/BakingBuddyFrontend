"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/app/constants';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        // 서버 로그아웃 API 호출
        const response = await fetch(`${API_URL}/logout`, {
          method: 'POST',
          credentials: 'include'
        });

        if (response.ok) {
          // localStorage에서 토큰 제거
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          // 로그인 페이지로 리다이렉트
          router.push('/login');
        } else {
          console.error('Failed to log out');
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    logout();
  }, [router]);

  return null; // 이 페이지는 UI를 렌더링하지 않습니다.
};

export default Logout;
