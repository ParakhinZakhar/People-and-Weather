"use client";

import { useState } from 'react'
import type { User } from '@/app/types/user'

export interface WeatherData {
  current: {
    time: Date;
    temperature: number;
    description: string;
    image: string;
  };
  daily: {
    temperature_min: number | null;
    temperature_max: number | null;
  };
}

export interface WeatherModal {
  user: User;
  weather: WeatherData;
}

export const useUserApi = (setUsers: React.Dispatch<React.SetStateAction<User[]>>) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [weatherModal, setWeatherModal] = useState<WeatherModal | null>(null);

  /**
   * @param isInitial - true for first load (shows Loader), false for subsequent adds (shows Skeleton)
   */
  const handleGenerateUser = async (isInitial = false) => {
    try {
      if (isInitial) {
        setIsInitialLoading(true);
      } else {
        setIsGenerating(true);
      }
      
      setError(null);

      const resUser = await fetch('/api/user?cacheBuster=' + Date.now());
      if (!resUser.ok) throw new Error('Failed to fetch user');
      const data: User = await resUser.json();

      const resGeo = await fetch(
        `/api/location?lat=${data.location.coordinates.latitude}&lon=${data.location.coordinates.longitude}`
      );
      if (!resGeo.ok) throw new Error('Failed to fetch location');

      const geoData = await resGeo.json();

      if (!geoData.displayName || geoData.displayName.includes('ussia')) {
        console.warn('Location not found, retrying...');
        return handleGenerateUser(isInitial);
      }

      const updatedUser: User = {
        ...data,
        location: {
          ...data.location,
          name: geoData.displayName,
          coordinates: { ...data.location.coordinates },
        },
      };

      setUsers((prev) => [...prev, updatedUser]);
      
    } catch (err) {
      console.error(err);
      setError('Error: user did not load');
    } finally {
      if (isInitial) {
        setIsInitialLoading(false);
      } else {
        setIsGenerating(false);
      }
    }
  };

  const handleShowWeather = async (user: User) => {
    try {
      const res = await fetch(
        `/api/weather?lat=${user.location.coordinates.latitude}&lon=${user.location.coordinates.longitude}`
      );
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to fetch weather');
      }

      const weather: WeatherData = await res.json();
      console.log('Weather data received:', weather);
      setWeatherModal({ user, weather });
    } catch (err) {
      alert('Weather data could not be fetched: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return {
    isInitialLoading,
    isGenerating,
    error,
    handleGenerateUser,
    weatherModal,
    setWeatherModal,
    handleShowWeather,
  };
};