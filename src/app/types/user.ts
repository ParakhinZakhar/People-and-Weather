export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    name?: string; 
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  email: string;
  picture: {
    medium: string;
    thumbnail: string;
  };
}