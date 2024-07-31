"use client";
import React, { useState, useEffect } from 'react';
import styles from '../../../css/form.module.css';
import { API_URL } from '@/app/constants';

interface Directory {
    id: number;
    name: string;
}

const DirectorySelect: React.FC<{ setDirId: React.Dispatch<React.SetStateAction<string>> }> = ({ setDirId }) => {
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
                    credentials: 'include', // Include cookies in the request
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                const data = json.data;
                setDirectories(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        }

        fetchDirectories();
    }, []);

    useEffect(() => {
        if (directories.length > 0) {
            setDirId(directories[0].id.toString());
        }else{
            setDirId('')
        }
    }, [directories, setDirId]);

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
            const newDirectory = json.data;
            setDirectories((prevDirectories) => [...prevDirectories, newDirectory]);
            setNewDirName("");
            setShowModal(false);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log(event.target.value)
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
            <select id="directory" name="directory" className={styles.input} onChange={handleSelectChange}>
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
