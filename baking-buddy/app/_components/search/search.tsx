import { API_URL } from "@/app/constants";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import styles from '../../../css/search.module.css';

interface Autocomplete {
    name: string;
    recipeId: string;
    imageUrl: string;
}

interface PopularItem {
    term: string;
    id: string;
}

interface RecentItem {
    search: string;
    timestamp: string;
}

const Search = ({ setSearchOpen }: { setSearchOpen: (open: boolean) => void }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [autocompleteResults, setAutocompleteResults] = useState<Autocomplete[]>([]);
    const [recentSearches, setRecentSearches] = useState<RecentItem[]>([]);
    const [popularSearches, setPopularSearches] = useState<PopularItem[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const fetchRecentAndPopularSearches = async () => {
        try {
            // Fetch recent searches
            const recentResponse = await axios.get(`${API_URL}/api/users/recent`, {
                withCredentials: true,
            });
            setRecentSearches(recentResponse.data.data);

            // Fetch popular searches
            const popularResponse = await axios.get(`${API_URL}/api/search/popular`, {
                withCredentials: true,
            });
            setPopularSearches(popularResponse.data.data);
        } catch (err) {
            console.error("Failed to fetch recent or popular searches", err);
        }
    };

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            try {
                // Fetch autocomplete results
                const response = await axios.get(`${API_URL}/api/redis/autocomplete?prefix=${e.target.value}`, {
                    withCredentials: true,
                });
                setAutocompleteResults(response.data.data);
            } catch (err) {
                console.error("Failed to fetch autocomplete results", err);
            }
        } else {
            setAutocompleteResults([]);
            fetchRecentAndPopularSearches(); // Fetch recent and popular searches when input is empty
        }
    };

    const handleSearchSubmit = async () => {
        if (searchTerm) {
            try {
                // Optionally fetch results before navigating
                await axios.get(`${API_URL}/api/search/recipes?term=${searchTerm}`, {
                    withCredentials: true,
                });
                // Navigate to search results page
                router.push(`/search?term=${searchTerm}`);
                setSearchOpen(false); // Close the modal after navigating
            } catch (err) {
                console.error("Failed to fetch search results", err);
            }
        }
    };

    const handleItemClick = (recipeId: string) => {
        router.push(`/recipes/${recipeId}`);
        setSearchOpen(false); // Close the modal after navigating
    };

    const handleItemNameClick = (term: string) => {
        router.push(`/search?term=${term}`);
        setSearchOpen(false); // Close the modal after navigating
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission behavior
            handleSearchSubmit(); // Trigger search on Enter key press
        }
    };

    useEffect(() => {
        fetchRecentAndPopularSearches(); // Fetch data when component mounts

        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setSearchOpen]);

    return (
        <div className={styles.overlay}>
            <div ref={searchRef} className={styles.searchContainer}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearchSubmit} className={styles.button}>
                    검색
                </button>
                {/* 검색어 있을 때 */}
                {autocompleteResults.length > 0 ? (
                    <div className={styles.resultsContainer}>
                        <ul className={styles.resultsList}>
                            {autocompleteResults.map((result) => (
                                <li 
                                    key={result.recipeId}
                                    className={styles.resultItem}
                                    onClick={() => handleItemClick(result.recipeId)}
                                >
                                    {result.imageUrl && (
                                        <img src={result.imageUrl} alt={result.name} className="w-8 h-8 mr-2 rounded-full" />
                                    )}
                                    {result.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (               
                    <div className={styles.resultsGrid}>  {/* 검색어 빈칸일 때 */} 
                        {recentSearches.length > 0 && (
                            <div className={styles.resultsContainer}>
                                <div className={styles.sectionTitle}>최근 검색어</div>
                                <ul className={styles.resultsList}>
                                    {recentSearches.map((item) => (
                                        <li
                                            key={item.search}
                                            className={styles.resultItem}
                                            onClick={() => handleItemNameClick(item.search)}
                                        >
                                            {item.search}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {popularSearches.length > 0 && (
                            <div className={styles.resultsContainer}>
                                <div className={styles.sectionTitle}>인기 검색어</div>
                                <ul className={styles.resultsList}>
                                    {popularSearches.map((item) => (
                                        <li
                                            key={item.id}
                                            className={styles.resultItem}
                                            onClick={() => handleItemNameClick(item.term)}
                                        >
                                            {item.term}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
