// app/_components/alarm/AlarmComponent.tsx
interface Alarm {
    id: number;
    msg: string;
    type: string;
    readYn: string;
  }
  
  interface AlarmComponentProps {
    alarms: Alarm[]; // Expect alarms to always be an array
  }
  
  export default function AlarmComponent({ alarms }: AlarmComponentProps) {
    // Default to an empty array if alarms is not provided
    const validAlarms = Array.isArray(alarms) ? alarms : [];
  
    return (
      <div>
        <h1>Alarm Page</h1>
        {validAlarms.length === 0 ? (
          <p>No alarms to display</p>
        ) : (
          <ul>
            {validAlarms.map(alarm => (
              <li key={alarm.id}>
                <p>{alarm.msg}</p>
                <p>Type: {alarm.type}</p>
                <p>Read: {alarm.readYn === 'Y' ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  