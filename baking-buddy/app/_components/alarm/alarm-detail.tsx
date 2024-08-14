"use client";
import { useEffect, useState } from 'react';
import { API_URL } from "@/app/constants";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styles from '@/css/alarm.module.css';

interface AlarmType {
    id: number;
    msg: string;
    type: string;
    read: string;
}

interface AlarmProps {
    alarms: AlarmType[];
    setAlarmOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlarmDetail = ({ alarms, setAlarmOpen }: AlarmProps) => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);

        if (storedUsername) {
            const socket = new SockJS(`${API_URL}/ws`);
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, onConnected, onError);

            function onConnected() {
                console.log('Connected to WebSocket');

                stompClient.subscribe(`/sub/alarm/${storedUsername}`, (message) => {
                    const newAlarm = JSON.parse(message.body);
                    console.log("New Alarm Received:", newAlarm);
                    // Update the UI or state with new alarms
                });
            }

            function onError(error: string) {
                console.error('WebSocket connection error:', error);
            }

            return () => {
                stompClient.disconnect(() => {
                    console.log('Disconnected from WebSocket');
                });
            };
        }
    }, []); // Empty dependency array means this runs once when component mounts

    const validAlarms = Array.isArray(alarms) ? alarms : [];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>알림</h1>
            {validAlarms.length === 0 ? (
                <p className={styles.noAlarms}>No alarms to display</p>
            ) : (
                <ul className={styles.alarmList}>
                    {validAlarms.map(alarm => (
                        <li key={alarm.id} className={styles.alarmItem}>
                            <p className={styles.alarmMsg}>{alarm.msg}</p>
                            <p className={styles.alarmType}>Type: {alarm.type}</p>
                            <p className={styles.alarmRead}>Read: {alarm.read === 'Y' ? 'Yes' : 'No'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AlarmDetail;
