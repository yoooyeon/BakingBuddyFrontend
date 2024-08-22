import React from 'react';
import Link from "next/link";
import styles from "@/css/user-profile-small.module.css";
interface UserProfileSmallProps {
    img?: string;
    username: string;
    uuid: string;
}

const UserProfileSmall: React.FC<UserProfileSmallProps> = ({ img, username, uuid }) => {
    return (
        <Link href={`/user/${uuid}`} >
            <div className={styles.container}>
                <img src={img} alt={username} className={styles.profileImage} />
                <div className={styles.username}>{username}</div>
            </div>
        </Link>
    );
};

export default UserProfileSmall;
