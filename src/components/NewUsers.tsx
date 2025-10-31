"use client";

import { useState, useEffect, useRef } from 'react'
import type { User } from '@/app/types/user'
import { CirclePlus } from 'lucide-react'
import { UserCard } from '@/components/ui/card'
import { UserCardSkeleton } from '@/components/ui/cardSkeleton'
import WeatherModal from '@/components/WeatherModal'
import Toast from '@/components/Toaster'
import Loader from '@/components/ui/loader'

import { useUserHandlers } from '@/hooks/useUserHandlers'
import { useUserApi } from '@/hooks/useUserApi'
import { useToast } from '@/hooks/useToast'

export default function DesktopNewUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const { toast, showToast, closeToast } = useToast();

  const { handleInputChange, handleSaveUser, handleDeleteUser } = useUserHandlers(setUsers, showToast);
  const { handleGenerateUser, handleShowWeather, weatherModal, setWeatherModal, loading, error } = useUserApi(setUsers);
  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      handleGenerateUser();
    }
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="hidden md:block p-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, idx) => (
          <UserCard
            key={idx}
            user={user}
            index={idx}
            handleInputChange={handleInputChange}
            handleSaveUser={handleSaveUser}
            handleDeleteUser={handleDeleteUser}
            handleShowWeather={handleShowWeather}
          />
        ))}

        <div
          onClick={handleGenerateUser}
          className="border-2 border-dashed border-gray-400 rounded-md shadow-md p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
        >
          <CirclePlus className="w-16 h-16 text-gray-400" />
          <span className="mt-2 text-gray-500 font-medium">Add New User</span>
        </div>
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