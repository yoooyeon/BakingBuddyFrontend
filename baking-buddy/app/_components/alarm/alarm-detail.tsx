"use client";
import React, { useEffect, useState } from 'react';
import { API_URL } from "@/app/constants";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styles from '@/css/alarm.module.css';

interface AlarmType {
    id: number;
    msg: string;
    type: string;
    read: boolean;
}

interface AlarmProps {
    alarms: AlarmType[];
    setAlarmOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlarmDetail = ({ alarms, setAlarmOpen }: AlarmProps) => {
    const [username, setUsername] = useState<string | null>(null);
    const [localAlarms, setLocalAlarms] = useState<AlarmType[]>(alarms);

    useEffect(() => {
        // Update local alarms when the alarms prop changes
        setLocalAlarms(alarms);
    }, [alarms]);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);

        if (storedUsername) {
            const socket = new SockJS(`${API_URL}/ws`);
            const stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                console.log('Connected to WebSocket');

                stompClient.subscribe(`/sub/alarm/${storedUsername}`, (message) => {
                    const newAlarm = JSON.parse(message.body);
                    console.log("New Alarm Received:", newAlarm);
                    // Update local alarms with new alarms from WebSocket
                    setLocalAlarms(prevAlarms => [...prevAlarms, newAlarm]);
                });
            }, (error:any) => {
                console.error('WebSocket connection error:', error);
            });

            return () => {
                stompClient.disconnect(() => {
                    console.log('Disconnected from WebSocket');
                });
            };
        }
    }, []);

    const handleAlarmClick = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}/api/alarms/${id}/read`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to mark alarm as read');
            }

            // Update local state to reflect read status change
            setLocalAlarms(prevAlarms =>
                prevAlarms.map(alarm =>
                    alarm.id === id ? { ...alarm, read: true } : alarm
                )
            );
        } catch (error) {
            console.error('Error marking alarm as read:', error);
        }
    };

    const hasUnreadAlarms = localAlarms.some(alarm => !alarm.read);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>알림</h1>
            {localAlarms.length === 0 ? (
                <p className={styles.noAlarms}>No alarms to display</p>
            ) : (
                <ul className={hasUnreadAlarms ? styles.alarmListUnread : styles.alarmList}>
                    {localAlarms.map(alarm => (
                        <li
                            key={alarm.id}
                            className={`${styles.alarmItem} ${!alarm.read ? styles.unreadItem : ''}`}
                            onClick={() => !alarm.read && handleAlarmClick(alarm.id)}
                        >
                            <p className={styles.alarmMsg}>{alarm.msg}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AlarmDetail;
