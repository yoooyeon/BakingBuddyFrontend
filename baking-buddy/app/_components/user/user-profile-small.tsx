import React from 'react';
import Link from "next/link";

interface UserProfileSmallProps {
    img?: string;
    username: string;
    uuid: string;
}

const UserProfileSmall: React.FC<UserProfileSmallProps> = ({ img, username, uuid }) => {
    return (
        <Link href={`/user/${uuid}`}>
            <div className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105">
                <img
                    src={img}
                    alt={username}
                    className="w-8 h-8 rounded-full object-cover transition-transform duration-300 hover:scale-120"
                />
                <div className="text-sm text-gray-800 transition-all duration-300 hover:text-base">
                    {username}
                </div>
            </div>
        </Link>
    );
};

export default UserProfileSmall;
