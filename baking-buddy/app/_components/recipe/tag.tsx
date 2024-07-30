import React from 'react';

interface TagProps {
  name: string;
}

const Tag: React.FC<TagProps> = ({ name }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full mr-2">
      #{name}
    </span>
  );
};

export default Tag;
