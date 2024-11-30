export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const calculatePerUnitEmissions = (
  totalEmissions: number,
  manufacturedQuantity: number
): number => {
  if (manufacturedQuantity <= 0) return 0;
  return totalEmissions / manufacturedQuantity;
};