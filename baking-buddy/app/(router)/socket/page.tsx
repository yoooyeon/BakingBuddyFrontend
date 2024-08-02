"use client";
import React, { useEffect, useState } from 'react';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_URL } from "@/app/constants";

const SocketPage = () => {
    const [userCount, setUserCount] = useState(0);
    const socketUrl = `${API_URL}/ws`; // Spring Boot WebSocket endpoint

    useEffect(() => {
        // Create a SockJS instance
        const socket = new SockJS(socketUrl);
        // Create a Stomp client using the SockJS instance
        const client = Stomp.over(socket);

        // Connect to the WebSocket server
        client.connect({}, (frame) => {
            console.log('Connected: ' + frame);

            // Subscribe to the topic
            client.subscribe('/topic/onlineUsers', (message) => {
                setUserCount(parseInt(message.body, 10));
            });

            // Publish a message to indicate user connection
            client.send('/app/userConnected', {}, {});
        }, (error) => {
            console.error('STOMP Error:', error);
        });

        // Handle disconnection
        return () => {
            client.disconnect(() => {
                console.log('Disconnected');
                // Publish a message to indicate user disconnection
                client.send('/app/userDisconnected', {}, {});
            }, (error) => {
                console.error('Disconnection Error:', error);
            });
        };
    }, []);

    return (
        <div>
            <h1>현재 접속자 수: {userCount}</h1>
        </div>
    );
};

export default SocketPage;
