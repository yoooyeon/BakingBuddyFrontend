import React, { useState, useCallback } from 'react';
import styles from '../../../css/form.module.css';

const TagList: React.FC<{ tags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>> }> = ({ tags, setTags }) => {
    const [tagInput, setTagInput] = useState<string>('');

    // 중복 호출 방지
    const addTag = useCallback(() => {
        if (tagInput.trim() !== '') {
            setTags(prevTags => {
                if (!prevTags.includes(tagInput.trim())) {
                    return [...prevTags, tagInput.trim()];
                }
                return prevTags;
            });
            setTagInput('');
        }
    }, [tagInput, setTags]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault(); // Prevent form submission
            addTag();
        }
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
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className={styles.input}
                />
                {/* <button type="button" onClick={addTag}>
                    추가
                </button> */}
            </div>
            <div id="tagList" className="mt-2">
                {tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-full mr-2">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagList;
