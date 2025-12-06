// Location utility functions for form submissions and location management

export interface UserLocation {
  lat: number;
  lng: number;
}

/**
 * Get user location from cookies
 */
export const getUserLocationFromCookie = (): UserLocation | null => {
  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const savedLocation = getCookie('userLocation');
  if (savedLocation) {
    try {
      return JSON.parse(savedLocation);
    } catch (error) {
      console.error('Error parsing saved location:', error);
      return null;
    }
  }
  return null;
};

/**
 * Set user location in cookies
 */
export const setUserLocationCookie = (location: UserLocation, days: number = 30): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `userLocation=${JSON.stringify(location)};expires=${expires.toUTCString()};path=/`;
};

/**
 * Get location data for form submissions
 * This can be used when users fill out forms to capture their location
 */
export const getLocationForFormSubmission = (): { location?: UserLocation; hasLocation: boolean } => {
  const location = getUserLocationFromCookie();
  return {
    location: location || undefined,
    hasLocation: location !== null
  };
};

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

/**
 * Get user's current location using browser geolocation API
 */
export const getCurrentLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        resolve(location);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

