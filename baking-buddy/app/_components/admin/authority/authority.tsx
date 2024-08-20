import React from 'react';
import styles from '@/css/authorities.module.css';

interface SelectUserResponseDto {
    username: string;
    nickname: string;
}

interface UserAuthorityRequest {
    id: number;
    user: SelectUserResponseDto;
    roleType: string;
    approval: boolean;
    approvedBy: string;
}

interface AuthorityProps {
    userAuthorities: UserAuthorityRequest[];
    onApprove: (id: number) => void;
}

const Authority: React.FC<AuthorityProps> = ({ userAuthorities, onApprove }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>권한 요청</h1>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>닉네임</th>
                    <th>요청 권한</th>
                    <th>승인 여부</th>
                    <th>승인자</th>
                </tr>
                </thead>
                <tbody>
                {userAuthorities.map(request => (
                    <tr key={request.id}>
                        <td>{request.user.username}</td>
                        <td>{request.user.nickname}</td>
                        <td>{request.roleType}</td>
                        <td>
                            {!request.approval ? (
                                <button className={styles.button} onClick={() => onApprove(request.id)}>승인</button>
                            ) : (
                                <button className={styles.button} disabled>승인 완료</button>
                            )}
                        </td>
                        <td>{request.approvedBy}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Authority;
