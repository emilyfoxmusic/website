const oneDayInMs = 1000 * 60 * 60 * 24;

export const formatTimeAgo = (isoDate: string): string => {
  if (!isoDate) {
    return 'Never';
  }
  const date = new Date(isoDate);
  const now = new Date();

  const yearsDifference = now.getUTCFullYear() - date.getUTCFullYear();
  if (yearsDifference > 1) {
    return `${yearsDifference} years ago`;
  }
  if (yearsDifference === 1) {
    return `${yearsDifference} year ago`;
  }
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / oneDayInMs);
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks > 1) {
    return `${diffInWeeks} weeks ago`;
  }
  if (diffInWeeks === 1) {
    return `${diffInWeeks} week ago`;
  }
  if (diffInDays > 1) {
    return `${diffInDays} days ago`;
  }
  if (diffInDays === 1) {
    return `${diffInDays} day ago`;
  }
  return 'Today';
};
