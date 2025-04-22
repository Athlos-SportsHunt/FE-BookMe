import { API_ROUTES, getApiUrl, getCSRFToken } from "./utils";

export const venueService = {
  createVenue: async (venueData: FormData) => {
    try {
      const csrfToken = getCSRFToken();
      const response = await fetch(getApiUrl(API_ROUTES.HOST.CREATE_VENUE), {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken || '',
        },
        credentials: 'include',
        body: venueData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        error: null
      };
    } catch (error) {
      console.error("Error creating venue:", error);
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  }
}; 