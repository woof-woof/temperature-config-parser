function getActiveProgramName(config, cDate) {
  const weekDay = cDate.getDay();
  const minutes = (cDate.getHours() * 60) + cDate.getMinutes();
  const dayKey = config.week[weekDay];

  // Find the closest entry with time < current time
  const sorted = config.day[dayKey].map((entry) => {
    const [entryHour, entryMinute] = entry.time.split(':').map(x => parseInt(x, 10));
    return {
      minutes: (entryHour * 60) + entryMinute,
      temperature: entry.temperature,
    };
  }).sort((a, b) => b.minutes - a.minutes);
  const matched = sorted.filter(entry => minutes > entry.minutes);

  return (matched.length ? matched[0] : sorted[0]).temperature;
}


/**
 * @param config JSON
 * @param date Date
 */
function getProgram(config, date = new Date()) {
  const programName = getActiveProgramName(config, date);
  const temperature = config.temperature[programName];
  if (!temperature) throw new Error('No temperature found');

  return {
    temperature: parseFloat(temperature),
    programName,
  };
}

module.exports = {
  getProgram,
};
