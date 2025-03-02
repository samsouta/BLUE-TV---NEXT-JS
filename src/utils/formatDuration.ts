export function formatDuration(seconds: number) {
    if (isNaN(seconds) || seconds < 0) {
        return '00:00'; // Return a default value if invalid
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        // Return format "HH:MM:SS"
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    } else {
        // Return format "MM:SS"
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
}