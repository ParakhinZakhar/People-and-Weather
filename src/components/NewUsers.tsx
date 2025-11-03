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
  const { 
    handleGenerateUser, 
    handleShowWeather, 
    weatherModal, 
    setWeatherModal, 
    isInitialLoading,
    isGenerating,
    error 
  } = useUserApi(setUsers);
  
  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      handleGenerateUser(true);
    }
  }, []);

  if (isInitialLoading) {
    return (
      <div className="p-4 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-7xl mx-auto">
        <p className="text-destructive text-center text-sm sm:text-base">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

        {isGenerating && <UserCardSkeleton />}

        {!isGenerating && (
          <div
            onClick={() => handleGenerateUser(false)}
            className="
              border-2 border-dashed border-border rounded-2xl shadow-md 
              p-6 sm:p-8 
              flex flex-col items-center justify-center 
              cursor-pointer hover:bg-accent transition-all
              min-h-[300px] sm:min-h-[400px]
            "
          >
            <CirclePlus className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
            <span className="mt-2 text-muted-foreground font-medium text-sm sm:text-base text-center">
              Add New User
            </span>
          </div>
        )}
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