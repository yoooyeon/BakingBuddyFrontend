import React, { useEffect } from 'react';
import styles from "../../../css/popup.module.css"

const AlarmPopup = ({ msg, onClose }) => {
  useEffect(() => {
    // 자동으로 팝업을 닫기 위해 3초 후에 onClose 호출
    const timer = setTimeout(() => {
      onClose();
    }, 1000); // 팝업이 표시되는 시간 (3초)

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
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
