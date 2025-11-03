"use client";

import { Modal, Box } from '@mui/material'
import { Button } from '@/components/ui/button'
import { X, ThermometerSun, ArrowUp, ArrowDown } from 'lucide-react'
import Image from "next/image"
import type { User } from '@/app/types/user'
import type { WeatherData } from '@/hooks/useUserApi'
import { useTheme } from 'next-themes'

interface WeatherModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
  weather: WeatherData;
}

export default function WeatherModal({
  open,
  onClose,
  user,
  weather
}: WeatherModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="weather-modal-title"
      className="flex items-center justify-center p-4"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
          }
        }
      }}
    >
      <Box
        className="
          bg-card border border-border rounded-2xl shadow-2xl
          w-full max-w-md mx-auto
          outline-none
          animate-in fade-in zoom-in duration-300
        "
        sx={{
          backgroundColor: isDark ? 'hsl(0, 0%, 3.9%)' : 'hsl(0, 0%, 100%)',
          borderColor: isDark ? 'hsl(0, 0%, 14.9%)' : 'hsl(0, 0%, 89.8%)',
        }}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <ThermometerSun className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                Weather Forecast
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {user.name.first} {user.name.last}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 mb-4 relative">
              <Image
                src={weather.current.image}
                alt={weather.current.description}
                width={80}
                height={80}
                className="drop-shadow-lg"
                unoptimized
                priority
              />
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
              {weather.current.temperature}°C
            </div>
            <p className="text-sm sm:text-base text-muted-foreground capitalize">
              {weather.current.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/50 border border-border">
              <div className="p-2 rounded-lg bg-red-500/10">
                <ArrowUp className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Maximum</p>
                <p className="text-lg sm:text-xl font-semibold text-foreground">
                  {weather.daily?.temperature_max ?? "N/A"}°C
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/50 border border-border">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <ArrowDown className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Minimum</p>
                <p className="text-lg sm:text-xl font-semibold text-foreground">
                  {weather.daily?.temperature_min ?? "N/A"}°C
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          <Button 
            onClick={onClose} 
            className="w-full"
            variant="default"
            size="lg"
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
}