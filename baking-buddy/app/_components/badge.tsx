import React from 'react';

interface BadgeProps {
    name: string;
    imageSrc?: string; // Make sure the prop name here matches the one used in the component
}

const Badge: React.FC<BadgeProps> = ({ name, imageSrc }) => {
    console.log(imageSrc); // Useful for debugging

    return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-green-400 rounded-md mr-1">
            {imageSrc && <img src={imageSrc} alt="badge icon" className="h-4 w-4 mr-1"/>}
            {name}
        </span>
    );
};

export default Badge;
