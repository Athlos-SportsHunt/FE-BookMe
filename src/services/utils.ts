const DEV_API_BASE_URL = "http://127.0.0.1:8000";
const PROD_API_BASE_URL = "https://sportshunt.in/api";
 
export const API_BASE_URL = false ? PROD_API_BASE_URL : DEV_API_BASE_URL;


export const API_ROUTES = {
    AUTH : {
        CHECK: "auth/check/",
        LOGIN : "login/", 
        LOGOUT : "logout/",
    },
}
 
export const getApiUrl = (route: string) => `${API_BASE_URL}/${route}`;

export function getCSRFToken() {
  const cookie = document.cookie.split("; ").find(row => row.startsWith("csrftoken="));
  return cookie ? cookie.split("=")[1] : null;
}