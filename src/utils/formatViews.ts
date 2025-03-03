// utils/formatViews.ts
interface ViewsProps {
  views: number;
}

export const formatViews = ({views}: ViewsProps) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M'; // Format as "1.0M"
    }
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'k'; // Format as "1.0k"
    }
    return views; // Return the number as is if it's less than 1000
  };
  