// Enum for possible day states
export type DayState = 'COMPLETED' | 'INCOMPLETE' | 'AT_RISK' | 'SAVED';

// Type for each day's data
export interface DayActivity {
  date: string;          // in 'YYYY-MM-DD' format
  activities: number;    // number of activities completed
  state: DayState;       // status of the day
}

// Final response type
export interface StreaksResponse {
  activitiesToday: number;  // number of activities for today
  total: number;            // total current streak
  days: DayActivity[];      // array of daily activity records
}