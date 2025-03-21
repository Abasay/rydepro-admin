import axios from 'axios';

// Create an axios instance
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  timeout: 20000,
});

// Define a generic request function with dynamic content-type
const makeRequest = async ({
  method,
  url,
  token,
  data,
  formData,
  params,
}: {
  method: string;
  url: string;
  token: string;
  data?: any;
  formData?: any;
  params?: any;
}): Promise<{
  message: string;
  success: boolean;
  data: any;
  setupToken: any;
  employeeId: any;
  masterKey: any;
  secondaryKey: any;
  token: any;
  admin: any;
  options: any;
}> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  };

  // Use formData content-type if formData is available, else use application/json
  if (formData) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  try {
    const requestResponse = await API({
      headers,
      method,
      url: API.defaults.baseURL + url, // Concatenate baseURL with url
      params,
      data: formData || data,
    });
    return requestResponse.data;
  } catch (error: any) {
    console.log('Error in makeRequest', error.response);
    return error.response.data;
  }
};

// Dynamic getRequest based on formData presence
export const getRequest = async ({ url, token, params }: { url: string; token: string; params?: any }) => {
  return makeRequest({
    method: 'GET',
    url: url,
    token,
    params,
  });
};

// Dynamic patchRequest based on formData presence
export const patchRequest = async ({
  url,
  token,
  params,
  formData,
  data,
}: {
  url: string;
  token: string;
  params?: any;
  formData?: any;
  data?: any;
}) => {
  return makeRequest({
    method: 'PATCH',
    url: url,
    token,
    params,
    data,
    formData,
  });
};

// Dynamic putRequest based on formData presence
export const putRequest = async ({
  url,
  token,
  data,
  formData,
  params,
}: {
  url: string;
  token: string;
  data?: any;
  formData?: any;
  params?: any;
}) => {
  return makeRequest({
    method: 'PUT',
    url: url,
    token,
    data,
    formData,
    params,
  });
};

// Dynamic postRequest based on formData presence
export const postRequest = async ({
  url,
  token,
  data,
  formData,
  params,
}: {
  url: string;
  token: string;
  data?: any;
  formData?: any;
  params?: any;
}) => {
  return makeRequest({
    method: 'POST',
    url: url,
    token,
    data,
    formData,
    params,
  });
};

// Dynamic deleteRequest based on formData presence
export const deleteRequest = async ({
  url,
  token,
  data,
  params,
}: {
  url: string;
  token: string;
  data?: any;
  params?: any;
}) => {
  return makeRequest({
    method: 'DELETE',
    url: url,
    token,
    data,
    params,
  });
};
