import { API_ROUTES, getApiUrl } from "./utils";

 
// Authentication service
export const authService = {
    /**
     * Check if the user is authenticated
     * @returns Promise with auth status and user data
     */
    checkAuth: async () => {
      try {
        const response = await fetch(getApiUrl(API_ROUTES.AUTH.CHECK), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important for cookies
        });
       
        if (!response.ok) {
          throw new Error('Auth check failed');
        }
        return await response.json();
      } catch (error) {
        console.error('Auth check error:', error);
        return { isAuthenticated: false, user: null };
      }
    },

    checkHost: async () => {
      try {
        const response = await fetch(getApiUrl(API_ROUTES.AUTH.CHECK), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Auth check failed');
        }

        const data = await response.json();
        if (data.isAuthenticated && data.user && data.user.is_host) {
          return { isHost: true, user: data.user };
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
      return { isHost: false, user: null };
    },
  };
   
   