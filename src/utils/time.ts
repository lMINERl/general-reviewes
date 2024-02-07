interface IDuration {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

/**
 *
 * @function durationMilliSeconds converts given time to milliseconds
 * @param {IDuration} args holds hours,minutes and seconds
 * @returns  duration in milliseconds
 *
 **/
export function durationMilliSeconds(args?: Partial<IDuration>): number {
  const minutes = (args?.hours ?? 0) * 60;
  const seconds = (minutes + (args?.minutes ?? 0)) * 60;
  const milliseconds = (seconds + (args?.seconds ?? 0)) * 1000;
  return milliseconds + (args?.milliseconds ?? 0);
}
