import React, { useEffect } from 'react';
import styles from '@/css/popup.module.css';

interface AlarmPopupProps {
    msg: string; // Define msg as a string prop
    onClose: () => void; // Define onClose as a function prop
}

const AlarmPopup: React.FC<AlarmPopupProps> = ({ msg, onClose }) => {
    useEffect(() => {
        // Automatically close the popup after 1 second
        const timer = setTimeout(() => {
            onClose();
        }, 1000); // Popup display time (1 second)

        return () => clearTimeout(timer); // Clean up timer on component unmount
    }, [onClose]);

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <span className={styles.text}>{msg}</span>
            </div>
        </div>
    );
};

export default AlarmPopup;
