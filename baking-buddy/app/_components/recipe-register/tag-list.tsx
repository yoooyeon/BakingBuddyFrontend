import React, { useState, useCallback } from 'react';
import styles from '@/css/tag.module.css';

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
            event.preventDefault(); // Prevent default behavior
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
        <div className={styles.inputGroup}>
            <label htmlFor="tagList" className={styles.label}>태그</label>
            <div>
                <input
                    type="text"
                    id="tagsInput"
                    placeholder="태그를 입력하세요"
                    value={tagInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={styles.input}
                />
            </div>
            <div id="tagList" className="mt-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full mr-2"
                    >
            #{tag}
                        <button className={styles.deleteButton} onClick={() => removeTag(index)}>×</button>
          </span>
                ))}
            </div>
        </div>
    );
};

export default TagList;
