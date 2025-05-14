const API_KEY = '9170e0e85794088df319259526c55afd';
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

const cityCoords: Record<string, { lat: number; lon: number }> = {
  'Los Angeles': { lat: 34.0549, lon: -118.2426 },
  'Rio de Janeiro': { lat: -22.9068, lon: -43.1729 },
  Beijing: { lat: 39.9042, lon: 116.4074 },
};

export const useWeather = () => {
  const forecastCache = new Map<string, Promise<{ list: any[] }>>();

  const getCoords = (city: string) => {
    const coords = cityCoords[city];
    if (!coords) throw new Error(`Coordinates not found for city: ${city}`);
    return coords;
  };

  const fetchForecast = (city: string) => {
    if (!forecastCache.has(city)) {
      const { lat, lon } = getCoords(city);
      const p = fetch(
        `${baseUrl}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
      ).then((res) => res.json());
      forecastCache.set(city, p);
    }
    return forecastCache.get(city)!;
  };

  const getHourlyForecast = async (city: string) => {
    const { list } = await fetchForecast(city);
    return list.slice(0, 6).map((entry: any) => ({
      dt: entry.dt,
      dt_txt: entry.dt_txt,
      temp: entry.main.temp,
      pop: entry.pop,
      icon: entry.weather[0].icon,
      weather: entry.weather[0].main,
    }));
  };

  interface Daily {
    date: string;
    temp_min: number;
    temp_max: number;
    icon: string;
    description: string;
  }

  const getDailyForecast = async (city: string): Promise<Daily[]> => {
    const { list } = await fetchForecast(city);
    const todayStr = new Date().toISOString().split('T')[0];

    const grouped: Record<string, typeof list> = {};
    for (const entry of list) {
      const [date] = entry.dt_txt.split(' ');
      if (date === todayStr) continue; // Skip current day
      (grouped[date] ||= []).push(entry);
    }

    return Object.keys(grouped)
      .sort()
      .map((date) => {
        const entries = grouped[date];
        const temps = entries.map((e) => e.main.temp);
        const temp_min = Math.min(...temps);
        const temp_max = Math.max(...temps);
        const noon =
          entries.find((e) => e.dt_txt.includes('12:00:00')) || entries[0];
        const { icon, description } = noon.weather[0];
        return { date, temp_min, temp_max, icon, description };
      });
  };

  return { getHourlyForecast, getDailyForecast };
};
