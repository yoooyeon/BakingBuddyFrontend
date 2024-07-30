// app/alarms/AlarmPage.tsx
import AlarmComponent from '@/app/_components/alarm/AlarmComponent';
import { API_URL } from '@/app/constants';

interface Alarm {
  id: number;
  msg: string;
  type: string;
  readYn: string;
}

async function fetchAlarms(userId: string): Promise<Alarm[]> {
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
      return []; // Return an empty array if there’s an error
    }
    const data = await response.json();
    return Array.isArray(data) ? data : []; // Ensure data is an array
  } catch (error) {
    console.error('Error fetching alarms:', error);
    return []; // Return an empty array on error
  }
}

export default async function AlarmPage() {
  const userId = '1'; // Replace with actual user ID
  const alarms = await fetchAlarms(userId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AlarmComponent alarms={alarms} />
    </div>
  );
}
