"use client";

import axios from 'axios';
import {useEffect, useState} from 'react';
import {API_URL} from "@/app/constants";
import Authority from "@/app/_components/admin/authority/authority";

interface SelectUserResponseDto {
    username: string;
    nickname: string;
}

interface UserAuthorityRequest {
    id: number;
    user: SelectUserResponseDto;
    roleType: string;
    approval: boolean;
    approvedBy: string;
}

const AuthoritiesPage = () => {
    const [userAuthorities, setUserAuthorities] = useState<UserAuthorityRequest[]>([]);

    useEffect(() => {
        async function fetchUserAuthorityRequests() {
            try {
                const response = await axios.get(`${API_URL}/api/admin/authorities`, {
                    withCredentials: true
                });
                const data = response.data.data; // Adjust based on your API response structure
                console.log(data);
                setUserAuthorities(data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching authority requests:', error);
            }
        }

        fetchUserAuthorityRequests();
    }, []);

    const handleApprove = async (id: number) => {
        try {
            await fetch(`${API_URL}/api/admin/authorities/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            setUserAuthorities(prev =>
                prev.filter(request => request.id !== id)
            );

            alert('Authority request approved!');
        } catch (error) {
            console.error('Error approving authority request:', error);
        }
    };

    return (
        <Authority userAuthorities={userAuthorities} onApprove={handleApprove}/>
    );
};

export default AuthoritiesPage;
