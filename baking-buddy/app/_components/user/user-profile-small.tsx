import React from 'react';

interface UserProfileSmallProps {
    img: string;
    name: string;
}

const UserProfileSmall: React.FC<UserProfileSmallProps> = ({ img, name }) => {
    return (
        <div className="flex items-center space-x-2">
            <img src={img} alt={name} className="w-8 h-8 rounded-full" />
            <div>{name}</div>
        </div>
    );
};

export default UserProfileSmall;
