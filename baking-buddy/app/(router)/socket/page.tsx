"use client";
import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_URL } from "@/app/constants";

const SocketPage = () => {
    const [userCount, setUserCount] = useState(0);
    const socketUrl = `${API_URL}/ws`; // Spring Boot WebSocket endpoint

    // Function to get the token
    const getToken = () => {
        return localStorage.getItem("accessToken");
    };

    useEffect(() => {
        const accessToken = getToken();
        const headers = {
            Authorization: accessToken ? `Bearer ${accessToken}` : ''
        };
        const socket = new SockJS(socketUrl);
        const client = Stomp.over(socket);

        client.connect(headers, (frame) => {
            console.log('Connected: ' + frame);
            // Subscribe to the topic to get the user count updates
            client.subscribe('/topic/onlineUsers', (message) => {
                const body = message.body;
                console.log('Received user count:', body);
                setUserCount(parseInt(body, 10)); // Update the state with new user count
            });

            // Publish a message to indicate user connection
            client.send('/app/userConnected', {}, {});
        }, (error) => {
            console.error('STOMP Error:', error);
        });

        // Handle disconnection
        return () => {
            alert("disconnected")
            if (client.connected) {
                // Ensure the message is sent before disconnecting
                client.send('/app/userDisconnected', {}, {}, () => {
                    console.log('User disconnected message sent');

                    // Disconnect after sending the message
                    client.disconnect(() => {
                        console.log('Disconnected');
                    }, (error) => {
                        console.error('Disconnection Error:', error);
                    });
                });
            } else {
                console.log('No STOMP connection to send disconnection message');
            }
        };
    }, []);

    return (
        <div>
            <h1>현재 접속자 수: {userCount}</h1>
        </div>
    );
};

export default SocketPage;
