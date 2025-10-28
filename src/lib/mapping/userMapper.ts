import type { apiRandomUser } from '@/app/types/apiUser'
import type { User } from '@/app/types/user';

export const mapApiUserToUser = (apiUser: apiRandomUser): User => ({
  gender: apiUser.gender,
  name: {
    title: apiUser.name.title,
    first: apiUser.name.first,
    last: apiUser.name.last,
  },
  location: {
    coordinates: {
      latitude: apiUser.location.coordinates.latitude,
      longitude: apiUser.location.coordinates.longitude,
    },
  },
  email: apiUser.email,
  picture: {
    medium: apiUser.picture.medium,
    thumbnail: apiUser.picture.thumbnail,
  },
});