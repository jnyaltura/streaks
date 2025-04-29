interface Props {
  dates: {
    date: string;
    activities: string[];
    state: 'COMPLETED' | 'INCOMPLETE' | 'AT_RISK' | 'SAVED';
  }[];
}

export default function StreakCard({ dates }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {dates.map((d, idx) => {
        const getBgColor = (state: string) => {
          switch (state) {
            case 'COMPLETED':
              return 'bg-green-100';
            case 'AT_RISK':
              return 'bg-yellow-100';
            case 'SAVED':
              return 'bg-blue-100';
            default:
              return 'bg-gray-100';
          }
        };

        return (
          <div
            key={idx}
            className={`p-4 rounded-xl shadow-md text-left transition-colors duration-300 ${getBgColor(d.state)}`}
          >
            <h3 className="text-lg font-semibold mb-2">{d.date}</h3>
            <p className="text-sm">Activities: {d.activities.length}</p>
            <p className="text-xs text-gray-500">State: {d.state}</p>
          </div>
        );
      })}
    </div>
  );
}
