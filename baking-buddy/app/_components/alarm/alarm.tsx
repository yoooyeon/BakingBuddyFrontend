interface AlarmType {
  id: number;
  msg: string;
  type: string;
  readYn: string;
}

interface AlarmProps {
  alarms: AlarmType[];
  setAlarmOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Alarm({ alarms, setAlarmOpen }: AlarmProps) {
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
              <p className="text-xs text-gray-500">Read: {alarm.readYn === 'Y' ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
