// interface IResponse {
//   success: boolean;
//   data?: unknown;
//   vehicleDetails?: [];
//   message?: string;
// }

// interface IResponse {
//   success: boolean;
//   data?: unknown;
//   message?: string;
// }

export const GET_REQUEST = async (url: string, token?: string) => {
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();
    return response;
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred, please try again.',
    };
  }
};

export const POST_REQUEST = async (url: string, data: unknown, token?: string) => {
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    return response;
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred, please try again.',
    };
  }
};

export const FILE_UPLOAD_POST_REQUEST = async (url: string, data: FormData, token?: string) => {
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data',
      },
      body: data, // FormData will set the correct Content-Type automatically
    });

    const response = await request.json();
    return response;
  } catch (error) {
    console.error('File upload error:', error);
    return {
      success: false,
      message: 'An error occurred, please try again.',
    };
  }
};

export const PUT_REQUEST = async (url: string, data: unknown, token?: string) => {
  try {
    const request = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    return response;
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred, please try again.',
    };
  }
};

export const DELETE_REQUEST = async (url: string, token?: string, data?: any) => {
  try {
    const request = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    return response;
  } catch (error: unknown) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred, please try again.',
    };
  }
};
