import React, { useState, useEffect } from 'react';
import styles from '@/css/form.module.css';
import { API_URL } from '@/app/constants';

interface Directory {
    id: number;
    name: string;
}

const DirectorySelect: React.FC<{ setDirId: React.Dispatch<React.SetStateAction<string>>, selectedDirId: string }> = ({ setDirId, selectedDirId }) => {
    const [directories, setDirectories] = useState<Directory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newDirName, setNewDirName] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchDirectories() {
            try {
                const response = await fetch(`${API_URL}/api/directories/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                setDirectories(Array.isArray(json.data) ? json.data : []);
                setLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        }

        fetchDirectories();
    }, []);

    useEffect(() => {
        if (directories.length > 0 && !selectedDirId) {
            setDirId(directories[0].id.toString());
        }
    }, [directories, selectedDirId, setDirId]);

    const handleAddDirectory = async () => {
        try {
            const response = await fetch(`${API_URL}/api/directories/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name: newDirName }),
            });
            if (!response.ok) {
                throw new Error('Failed to add directory');
            }
            const json = await response.json();
            setDirectories((prevDirectories) => [...prevDirectories, json.data]);
            setNewDirName("");
            setShowModal(false);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDirId(event.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.inputGroup}>
            <label className={styles.label}>디렉토리</label>
            <button
                id="addDirBtn"
                type="button"
                className={`${styles.button} ${styles.submitButton}`}
                onClick={() => setShowModal(true)}
            >
                디렉토리 추가
            </button>
            <select id="directory" name="directory" className={styles.input} onChange={handleSelectChange} value={selectedDirId}>
                {directories.map((directory) => (
                    <option key={directory.id} value={directory.id}>
                        {directory.name}
                    </option>
                ))}
            </select>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>새 디렉토리 추가</h3>
                        <input
                            type="text"
                            value={newDirName}
                            onChange={(e) => setNewDirName(e.target.value)}
                            className={styles.input}
                        />
                        <button
                            onClick={handleAddDirectory}
                            className={`${styles.button} ${styles.submitButton}`}
                        >
                            추가
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            className={styles.button}
                        >
                            취소
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DirectorySelect;
