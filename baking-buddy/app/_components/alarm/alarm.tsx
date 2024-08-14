"use client"
import { useEffect, useState } from 'react';
import { API_URL } from "@/app/constants";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

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

export default function Alarm({ alarms, setAlarmOpen }: AlarmProps) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    if (storedUsername) {
      let socket = new SockJS(`${API_URL}/ws`);
      let stompClient = Stomp.over(socket);

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
      <div className="p-4 max-h-80 overflow-y-auto">
        <h1 className="text-lg font-semibold mb-4">알림</h1>
        {validAlarms.length === 0 ? (
            <p>No alarms to display</p>
        ) : (
            <ul>
              {validAlarms.map(alarm => (
                  <li key={alarm.id} className="border-b last:border-b-0 py-2">
                    <p className="text-sm">{alarm.msg}</p>
                    <p className="text-xs text-gray-500">Type: {alarm.type}</p>
                    <p className="text-xs text-gray-500">Read: {alarm.read === 'Y' ? 'Yes' : 'No'}</p>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
}
