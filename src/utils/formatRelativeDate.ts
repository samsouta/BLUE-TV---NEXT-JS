// utils/customFormatRelativeDate.ts
export function formatRelativeDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime(); // Difference in milliseconds
    const diffSec = Math.floor(diffMs / 1000);       // in seconds
    const diffMin = Math.floor(diffSec / 60);        // in minutes
    const diffHr  = Math.floor(diffMin / 60);        // in hours
    const diffDay = Math.floor(diffHr / 24);         // in days
  
    if (diffMin < 1) {
      // For very recent times, force "1 min ago"
      return '1 min ago';
    } else if (diffMin < 60) {
      return `${diffMin} min ago`;
    } else if (diffHr < 24) {
      return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;
    } else if (diffDay < 7) {
      return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
    } else if (diffDay < 365) {
      const diffWeek = Math.floor(diffDay / 7);
      return `${diffWeek} week${diffWeek === 1 ? '' : 's'} ago`;
    } else {
      const diffYear = Math.floor(diffDay / 365);
      return `${diffYear} year${diffYear === 1 ? '' : 's'} ago`;
    }
  }
  