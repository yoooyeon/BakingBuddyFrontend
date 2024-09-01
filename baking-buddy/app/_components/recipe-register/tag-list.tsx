import React, { useState, useCallback } from 'react';

const TagList: React.FC<{ tags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>> }> = ({
                                                                                                            tags,
                                                                                                            setTags
                                                                                                        }) => {
    const [tagInput, setTagInput] = useState<string>('');

    const addTag = useCallback(() => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags(prevTags => [...prevTags, trimmedTag]);
            setTagInput('');
        }
    }, [tagInput, tags, setTags]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            addTag();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(event.target.value);
    };

    const removeTag = (index: number) => {
        setTags(prevTags => prevTags.filter((_, i) => i !== index));
    };

    return (
        <div className="mb-6">
            <label htmlFor="tagList" className="block text-gray-700 font-bold mb-2 text-lg">태그</label>
            <div>
                <input
                    type="text"
                    id="tagsInput"
                    placeholder="태그를 입력하세요"
                    value={tagInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="mt-1 p-2.5 border border-gray-300 rounded-md w-full text-sm outline-none focus:border-blue-400 focus:ring focus:ring-blue-200 transition"
                />
            </div>
            <div id="tagList" className="mt-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full mr-2"
                    >
                        #{tag}
                        <button
                            className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700"
                            onClick={() => removeTag(index)}
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagList;
