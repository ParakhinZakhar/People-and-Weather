"use client";

import { useEffect, useState, useRef } from 'react'
import type { User } from '@/app/types/user'
import { UserCard } from '@/components/ui/card'
import { EmptyBanner } from '@/components/ui/empty'
import WeatherModal from '@/components/WeatherModal'
import Toast from '@/components/Toaster'

import { useUserHandlers } from '@/hooks/useUserHandlers'
import { useUserApi } from '@/hooks/useUserApi'
import { useToast } from '@/hooks/useToast'

export default function SavedUsers() {
  const [savedUsers, setSavedUsers] = useState<User[]>([]);
  const { toast, showToast, closeToast } = useToast();

  const { handleDeleteSavedUser } = useUserHandlers(setSavedUsers, showToast);
  const { handleShowWeather, weatherModal, setWeatherModal } = useUserApi(setSavedUsers);
  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('savedUsers') || '[]');
        setSavedUsers(stored);
      }
    }
  }, []);

  if (savedUsers.length === 0) return <EmptyBanner message="No saved users yet" />;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {savedUsers.map((user, idx) => (
          <UserCard
            key={idx}
            user={user}
            index={idx}
            editable={false}
            handleDeleteSavedUser={(i) => handleDeleteSavedUser(i)}
            handleShowWeather={handleShowWeather}
          />
        ))}
      </div>

      {weatherModal && (
        <WeatherModal
          open={Boolean(weatherModal)}
          onClose={() => setWeatherModal(null)}
          user={weatherModal.user}
          weather={weatherModal.weather}
        />
      )}

      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />
    </div>
  );
}