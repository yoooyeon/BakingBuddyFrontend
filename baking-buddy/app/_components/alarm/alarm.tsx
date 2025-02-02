"use client";
import React, {useEffect, useState} from 'react';
import {API_URL} from "@/app/constants";
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import styles from '@/css/alarm.module.css';
import Link from "next/link";
import { useRouter } from 'next/navigation';
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

export default function Alarm({alarms, setAlarmOpen}: AlarmProps) {
    const [username, setUsername] = useState<string | null>(null);
    const [localAlarms, setLocalAlarms] = useState<AlarmType[]>(alarms);
    const router = useRouter();
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
                    // Add new alarm to local state
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
                    alarm.id === id ? {...alarm, read: true} : alarm
                )
            );
        } catch (error:any) {
            console.error('Error marking alarm as read:', error);
        }
    };

    const validAlarms = Array.isArray(localAlarms) ? localAlarms : [];

    // Determine if there are any unread alarms
    const hasUnreadAlarms = validAlarms.some(alarm => !alarm.read);

    return (
        <div className={`p-4 max-h-80 overflow-y-auto ${hasUnreadAlarms ? styles.containerUnread : styles.container}`}>
            <Link href="/alarms"><h1 className="text-lg font-semibold mb-4" style={{ width: '100%' }}>알림</h1></Link>


            {validAlarms.length === 0 ? (
                <p>No alarms to display</p>
            ) : (
                <ul className={styles.alarmList}>
                    {validAlarms.map(alarm => (
                        <li
                            key={alarm.id}
                            className={`${styles.alarmItem} ${!alarm.read ? styles.unreadItem : ''}`}
                        >
                            <button
                                className="w-full text-left"
                                onClick={() => !alarm.read && handleAlarmClick(alarm.id)}
                            >
                                <p className={styles.alarmMsg}>{alarm.msg}</p>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <div className={styles.viewAllLink}>
                <button className={styles.viewAllLinkBtn} onClick={() => router.push('/alarms')}>모든 알림 보기</button>
            </div>
        </div>
    );
}
