import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StreakCard from '../components/StreakCard';
import axios from 'axios';

interface StreakDate {
  date: string;
  activities: string[];
  state: 'COMPLETED' | 'INCOMPLETE' | 'AT_RISK' | 'SAVED';
}

interface StreakData {
  case: string;
  total: number;
  dates: StreakDate[];
}

export default function HomePage() {
  const { caseId } = useParams<{ caseId: string }>();
  const [data, setData] = useState<StreakData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get<StreakData>(`/streaks/${caseId}`);
        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'Error fetching data');
      }
    };

    fetchData();
  }, [caseId]);

  return (
    <div className="min-h-screen bg-[#FFF9EE] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-6">ahead</h1>
      {error && <p className="text-red-500">{error}</p>}
      {data ? (
        <>
          <h2 className="text-3xl font-bold mb-4">
            Your streak is {data.total} {data.total === 1 ? 'day' : 'days'}
          </h2>
          <StreakCard dates={data.dates} />
        </>
      ) : (
        !error && <p>Loading streak data...</p>
      )}
    </div>
  );
}
