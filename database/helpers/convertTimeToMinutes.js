function convertTimeToMinutes(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    return totalMinutes.toFixed(2);
  }
  
  module.exports = convertTimeToMinutes;
  