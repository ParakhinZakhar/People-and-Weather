"use client";

import { User } from '@/app/types/user'
import { Card, CardContent, CardActions, Grid, Typography, Divider } from '@mui/material'
import { Button } from '@/components/ui/button'
import { CloudSunRain, Save, CircleX } from 'lucide-react'
import { UserAvatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

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
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">{label}</span>
          <span className="font-medium text-foreground">{value || "—"}</span>
        </div>
      );
    }
  };

  return (
    <Card
      className="
        rounded-2xl shadow-md hover:shadow-lg transition-all duration-300
        border border-border bg-card text-card-foreground flex flex-col items-center
        p-4 sm:p-6
      "
    >
      <CardContent className="flex flex-col items-center text-center w-full space-y-4">
        <UserAvatar
          src={user.picture.medium}
          alt={`${user.name.first} ${user.name.last}`}
          size="xl"
        />

        <Typography variant="h6" className="font-semibold text-foreground mt-1">
          {user.name.first} {user.name.last}
        </Typography>

        <Divider className="w-full my-2 bg-border" />

        <Grid container spacing={1.5} className="w-full">
          <Grid item xs={4}>
            {renderField("Title", user.name.title, "name.title")}
          </Grid>
          <Grid item xs={8}>
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
          flex justify-center gap-3 w-full border-t border-border pt-4
          flex-wrap
        "
      >
        {editable && handleSaveUser && (
          <Button onClick={() => handleSaveUser(user)} variant="outline" size="sm">
            <Save className="mr-1 h-4 w-4" /> Save
          </Button>
        )}

        {handleShowWeather && (
          <Button onClick={() => handleShowWeather(user)} variant="outline" size="sm">
            <CloudSunRain className="mr-1 h-4 w-4" /> Weather
          </Button>
        )}

        {editable && handleDeleteUser && (
          <Button onClick={() => handleDeleteUser(index)} variant="destructive" size="sm">
            <CircleX className="mr-1 h-4 w-4" /> Delete
          </Button>
        )}

        {!editable && handleDeleteSavedUser && (
          <Button onClick={() => handleDeleteSavedUser(index)} variant="destructive" size="sm">
            <CircleX className="mr-1 h-4 w-4" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};