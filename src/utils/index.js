// Utility functions

// Create page URL helper
export const createPageUrl = (page) => {
  return `/${page.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}`;
};

// Format airline name for display
export const formatAirlineName = (name) => {
  return name ? name.trim() : '';
};

// Check if string contains Arabic characters
export const hasArabicText = (text) => {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};