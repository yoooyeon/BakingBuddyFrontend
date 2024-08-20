"use client";
import axios from 'axios';
import { API_URL } from '@/app/constants';
import { useState } from 'react';

interface Item {
    title: string;
    link: string;
    image: string;
    lprice: string; // JSON 응답에서 lprice는 문자열로 반환됨
    hprice: string; // JSON 응답에서 hprice는 문자열로 반환됨
    mallName: string;
    productId: string; // JSON 응답에서 productId는 문자열로 반환됨
    productType: string; // JSON 응답에서 productType은 문자열로 반환됨
    maker: string;
    brand: string;
    category1: string;
    category2: string;
    category3: string;
    category4: string;
}

interface ProductResponse {
    lastBuildDate: string;
    total: number;
    start: number;
    display: number;
    items: Item[];
}

const NaverSearch = () => {
    const [data, setData] = useState<Item[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecipes = async (term: string) => {
        if (!term) return;
        setLoading(true); // 로딩 시작
        try {
            const response = await axios.get<ProductResponse>(`${API_URL}/search`, {
                params: { query: term, display: 10, start: 1, sort: 'sim' }, // 쿼리 파라미터 추가
                withCredentials: true,
            });
            setData(response.data.items || []); // 데이터 설정
        } catch (err) {
            console.error("Failed to fetch search results", err);
            setError('Failed to fetch search results');
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    const handleSearch = () => {
        fetchRecipes(searchTerm);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search term"
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <img src={item.image} alt={item.title} width="100" />
                            <h3>{item.title}</h3>
                            <p>Price: {item.lprice}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NaverSearch;
