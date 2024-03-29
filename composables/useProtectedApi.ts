export const getBaseURL = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  return baseUrl;
};

const getAuthHeaders = () => {
  try {
    const token = useCookie('authToken');
    if (token.value) {
      return { Authorization: `Bearer ${token.value}` };
    }
  } catch (error) {
    console.log(error);
  }
  return {};
};

const handleResponseError = (response: Error) => {
  const authStore = useAuthStore();
  if ([401, 403].includes(response.status)) {
    authStore.logout();
    return response;
    // TODO: Add logic to logout or handle unauthorized/forbidden errors
  }

  const error = (response._data && response._data.message) || 'Error occurred';
  return Promise.reject(error);
};

// export const refreshApi = () => {
//  const baseURL = getBaseURL();
//  return $fetch.create({
//    baseURL,
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    credentials: 'include',
//    cache: "default"
//  })
// }
export const useProtectedApi = () => {
  const baseURL = getBaseURL();
  return $fetch.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'default',
    onRequest({ options }) {
      options.headers = options.headers || {};
      options.headers = { ...options.headers, ...getAuthHeaders() };
    },
    onRequestError({ request, options, error }) {
      handleResponseError(error);
    },
    onResponse({ request, response, options }) {
      return response._data;
    },
    onResponseError({ request, response, options }) {
      /// handleResponseError(response);
    },
  });
};
