import React from 'react';
import Link from "next/link";

interface UserProfileSmallProps {
    img: string;
    username: string;
    uuid: string;
}

const UserProfileSmall: React.FC<UserProfileSmallProps> = ({img, username,uuid}) => {
    return (
        <Link href={`/user/${uuid}`}>
            <div className="flex items-center space-x-2">
                <img src={img} alt={username} className="w-8 h-8 rounded-full"/>
                <div>{username}</div>
            </div>
        </Link>
    );
};

export default UserProfileSmall;
