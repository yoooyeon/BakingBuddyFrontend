"use client"
import { API_URL } from "@/app/constants";
import { SearchIcon } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [popularSearches, setPopularSearches] = useState<string[]>([]);
    const [autocompleteResults, setAutocompleteResults] = useState<string[]>([]);
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            // Cache the search term
            axios.post(`${API_URL}/api/redis/term`, { term: e.target.value }, {
                withCredentials: true,
            })
                .catch((err) => {
                    console.error("Failed to cache search term", err);
                });
        }
    };

    useEffect(() => {
        if (!searchTerm) {
            // Fetch recent and popular searches when search term is empty
            axios.get(`${API_URL}/api/users/recent`, {
                withCredentials: true,
            })
                .then((res) => {
                    const data = Array.isArray(res.data) ? res.data : [];
                    setRecentSearches(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch recent searches", err);
                    setRecentSearches([]);
                });

            axios.get(`${API_URL}/api/search/popular`, {
                withCredentials: true,})
                .then((res) => {
                    const data = Array.isArray(res.data) ? res.data : [];
                    setPopularSearches(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch popular searches", err);
                    setPopularSearches([]);
                });
        } else {
            // Fetch autocomplete results when search term is not empty
            axios.get(`${API_URL}/api/redis/autocomplete?term=${searchTerm}`, {
                withCredentials: true,
            })
                .then((res) => {
                    const data = Array.isArray(res.data) ? res.data : [];
                    setAutocompleteResults(data);
                })
                .catch((err) => {
                    console.error("Failed to fetch autocomplete results", err);
                    setAutocompleteResults([]);
                });
        }
    }, [searchTerm]);

    return (<div className="relative">
        <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-primary">
            <SearchIcon className="h-6 w-6" />
        </button>
        {searchOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded shadow-lg">
                <input
                    type="text"
                    className="w-full p-2 border-b border-gray-300"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="p-2">
                    {searchTerm ? (
                        <ul>
                            {autocompleteResults.map((result, index) => (
                                <li key={index} className="p-1 hover:bg-gray-200">
                                    {result}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <>
                            <h4 className="font-bold">최근 검색어</h4>
                            <ul>
                                {recentSearches.map((term, index) => (
                                    <li key={index} className="p-1 hover:bg-gray-200">
                                        {term}
                                    </li>
                                ))}
                            </ul>
                            <h4 className="mt-2 font-bold">인기 검색어</h4>
                            <ul>
                                {popularSearches.map((term, index) => (
                                    <li key={index} className="p-1 hover:bg-gray-200">
                                        {term}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
    )
}

export default Search;