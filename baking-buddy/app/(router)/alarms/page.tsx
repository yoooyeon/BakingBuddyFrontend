"use client"
import React, { useEffect, useState } from 'react';
import { API_URL } from '@/app/constants';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import AlarmDetail from "@/app/_components/alarm/alarm-detail";

interface Alarm {
    id: number;
    msg: string;
    type: string;
    read: string;
}

export default function AlarmPage() {
    const [alarms, setAlarms] = useState<Alarm[]>([]);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlarms = async () => {
            try {
                const response = await fetch(`${API_URL}/api/alarms/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    console.error('Failed to fetch alarms');
                    return;
                }

                const json = await response.json();
                const data = json.data
                setAlarms(Array.isArray(data) ? data : []); // Ensure data is an array
            } catch (error) {
                console.error('Error fetching alarms:', error);
            }
        };

        fetchAlarms();
    }, []); // Empty dependency array means this runs once when component mounts

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
                    // Update alarms state to include new alarm
                    setAlarms(prevAlarms => [...prevAlarms, newAlarm]);
                });
            }, (error) => {
                console.error('WebSocket connection error:', error);
            });

            return () => {
                stompClient.disconnect(() => {
                    console.log('Disconnected from WebSocket');
                });
            };
        }
    }, []); // Empty dependency array means this runs once when component mounts

    return (
        <div>
            <AlarmDetail alarms={alarms} />
        </div>
    );
}
