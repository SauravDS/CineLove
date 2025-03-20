// Format a timestamp into a readable chat time (e.g., "12:34 PM")
function formatChatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Truncate a string with ellipsis if it exceeds a max length
  function truncateString(str, maxLength = 50) {
    if (!str || str.length <= maxLength) return str;
    return `${str.substring(0, maxLength - 3)}...`;
  }
  
  // Generate a random pastel color for user avatars (if needed)
  function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
  }
  
  // Debounce a function to limit how often it runs (e.g., for search input)
  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }
  
  export { formatChatTime, truncateString, getRandomPastelColor, debounce };