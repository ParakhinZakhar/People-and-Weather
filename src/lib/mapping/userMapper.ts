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
    street: {
      number: apiUser.location.street.number,
      name: apiUser.location.street.name,
    },
    city: apiUser.location.city,
    state: apiUser.location.state,
    country: apiUser.location.country,
    postcode: apiUser.location.postcode,
    coordinates: {
      latitude: apiUser.location.coordinates.latitude,
      longitude: apiUser.location.coordinates.longitude,
    },
    timezone: {
      offset: apiUser.location.timezone.offset,
      description: apiUser.location.timezone.description,
    },
  },
  email: apiUser.email,
  phone: apiUser.phone,
  picture: {
    medium: apiUser.picture.medium,
    thumbnail: apiUser.picture.thumbnail,
  },
});
