"use client";

import { User } from '@/app/types/user'
import { Card, CardContent, CardActions, Grid, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Button } from '@/components/ui/button'
import { CloudSunRain, Save, CircleX } from 'lucide-react'
import { UserAvatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { useTheme } from 'next-themes'
import { useMemo } from 'react'

interface UserCardProps {
  user: User;
  index?: number;
  editable?: boolean;
  handleInputChange?: (index: number, fieldPath: string, value: string) => void;
  handleSaveUser?: (user: User) => void;
  handleDeleteUser?: (index: number) => void;
  handleDeleteSavedUser?: (index: number) => void;
  handleShowWeather?: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  index = 0,
  editable = true,
  handleInputChange,
  handleSaveUser,
  handleDeleteUser,
  handleDeleteSavedUser,
  handleShowWeather,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? 'dark' : 'light',
          background: {
            default: isDark ? 'hsl(0, 0%, 3.9%)' : 'hsl(0, 0%, 100%)',
            paper: isDark ? 'hsl(0, 0%, 3.9%)' : 'hsl(0, 0%, 100%)',
          },
          text: {
            primary: isDark ? 'hsl(0, 0%, 98%)' : 'hsl(0, 0%, 3.9%)',
            secondary: isDark ? 'hsl(0, 0%, 63.9%)' : 'hsl(0, 0%, 45.1%)',
          },
          divider: isDark ? 'hsl(0, 0%, 14.9%)' : 'hsl(0, 0%, 89.8%)',
        },
      }),
    [isDark]
  );

  const renderField = (label: string, value: string, path: string) => {
    if (editable && handleInputChange) {
      return (
        <Input
          label={label}
          value={value}
          onChange={(e) => handleInputChange(index, path, e.target.value)}
        />
      );
    } else {
      return (
        <Input
          label={label}
          value={value}
          disabled
          InputProps={{
            readOnly: true,
          }}
        />
      );
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Card
        className="
          rounded-2xl shadow-md hover:shadow-lg transition-all duration-300
          border border-border bg-card text-card-foreground 
          flex flex-col h-full w-full
        "
        sx={{
          backgroundColor: isDark ? 'hsl(0, 0%, 3.9%)' : 'hsl(0, 0%, 100%)',
          borderColor: isDark ? 'hsl(0, 0%, 14.9%)' : 'hsl(0, 0%, 89.8%)',
        }}
      >
        <CardContent className="flex flex-col items-center text-center w-full space-y-3 sm:space-y-4 p-4 sm:p-6">
          <UserAvatar
            src={user.picture.medium}
            alt={`${user.name.first} ${user.name.last}`}
            size="xl"
            className="w-20 h-20 sm:w-24 sm:h-24"
          />

          <Typography 
            variant="h6" 
            className="font-semibold text-foreground text-base sm:text-lg break-words w-full"
            sx={{
              color: isDark ? 'hsl(0, 0%, 98%)' : 'hsl(0, 0%, 3.9%)',
            }}
          >
            {user.name.first} {user.name.last}
          </Typography>

          <Grid container spacing={1.5} className="w-full">
            <Grid item xs={12}>
              {renderField("Title", user.name.title, "name.title")}
            </Grid>
            <Grid item xs={12}>
              {renderField("First Name", user.name.first, "name.first")}
            </Grid>
            <Grid item xs={12}>
              {renderField("Last Name", user.name.last, "name.last")}
            </Grid>
            <Grid item xs={12}>
              {renderField("Gender", user.gender, "gender")}
            </Grid>
            <Grid item xs={12}>
              {renderField("Email", user.email, "email")}
            </Grid>
            <Grid item xs={12}>
              {renderField("Location", user.location.name, "location.name")}
            </Grid>
          </Grid>
        </CardContent>

        <CardActions
          className="
            flex justify-center gap-2 sm:gap-3 w-full 
            border-t border-border pt-3 sm:pt-4 pb-3 sm:pb-4 px-4
            flex-wrap mt-auto
          "
          sx={{
            borderTopColor: isDark ? 'hsl(0, 0%, 14.9%)' : 'hsl(0, 0%, 89.8%)',
          }}
        >
          {editable && handleSaveUser && (
            <Button 
              onClick={() => handleSaveUser(user)} 
              variant="outline" 
              size="sm"
              className="flex-1 min-w-[80px] text-xs sm:text-sm"
            >
              <Save className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Save
            </Button>
          )}

          {handleShowWeather && (
            <Button 
              onClick={() => handleShowWeather(user)} 
              variant="outline" 
              size="sm"
              className="flex-1 min-w-[80px] text-xs sm:text-sm"
            >
              <CloudSunRain className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Weather
            </Button>
          )}

          {editable && handleDeleteUser && (
            <Button 
              onClick={() => handleDeleteUser(index)} 
              variant="destructive" 
              size="sm"
              className="flex-1 min-w-[80px] text-xs sm:text-sm"
            >
              <CircleX className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Delete
            </Button>
          )}

          {!editable && handleDeleteSavedUser && (
            <Button 
              onClick={() => handleDeleteSavedUser(index)} 
              variant="destructive" 
              size="sm"
              className="flex-1 min-w-[80px] text-xs sm:text-sm"
            >
              <CircleX className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};