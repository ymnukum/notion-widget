
export const getGreeting = (hours: number): string => {
  if (hours >= 5 && hours < 12) return 'Good Morning';
  if (hours >= 12 && hours < 17) return 'Good Afternoon';
  if (hours >= 17 && hours < 21) return 'Good Evening';
  return 'Good Night';
};

export const formatTimePart = (part: number): string => {
  return part.toString().padStart(2, '0');
};

export const getFormattedDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
