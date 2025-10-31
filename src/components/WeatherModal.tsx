"use client";

import { Modal, Box } from '@mui/material'
import { Button } from '@/components/ui/button'
import type { User } from '@/app/types/user'

interface WeatherModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
  weather: unkown;
}

export default function WeatherModal({
  open,
  onClose,
  user,
  weather
}: WeatherModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="weather-modal-title"
      className="flex items-center justify-center"
    >
      <Box
        className="
            bg-white shadow-xl rounded-xl p-6 w-full max-w-md 
            backdrop-blur-sm
            border border-gray-200 
        "
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Weather for {user.name.first} {user.name.last}
        </h2>

        <p className="text-lg font-medium">
          🌡 Current: {weather.current.temperature}°C
        </p>
        <p className="text-sm text-gray-600">{weather.current.description}</p>

        <img
          src={weather.current.image}
          alt={weather.current.description}
          className="mx-auto my-3 w-20 h-20"
        />

        <div className="flex justify-between text-center text-sm mt-2">
          <span>⬆ Max: {weather.daily?.temperature_max ?? "N/A"}°C</span>
          <span>⬇ Min: {weather.daily?.temperature_min ?? "N/A"}°C</span>
        </div>

        <Button onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </Box>
    </Modal>
  );
}