// TagList.tsx
import React, { useState } from 'react';
import styles from '../../../css/form.module.css';

const TagList: React.FC<{ tags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>> }> = ({ tags, setTags }) => {
    const [tagInput, setTagInput] = useState<string>('');

    const addTag = () => {
        if (tagInput.trim() !== '') {
            setTags([...tags, tagInput]);
            setTagInput('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
            addTag();
            event.preventDefault(); // Prevent form submission
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
                />
                <button type="button" onClick={addTag}>
                    추가
                </button>
            </div>
            <div id="tagList">
                {tags.map((tag, index) => (
                    <div key={index}>{tag}</div>
                ))}
            </div>
        </div>
    );
};

export default TagList;
