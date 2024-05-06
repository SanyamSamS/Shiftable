

export const signUpEmployee = async (userData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData) 
  };

  try {
    const response = await fetch('/api/user', requestOptions);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error occurred while creating user");
    }
    return data;
  } catch (error) {
    console.error('Error in signUpEmployee:', error);
    throw error;
  }
};

//check if user signup information is already in database 
export const checkAvailability = async ({ username, email, password }) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  };

  try {
    const response = await fetch('/api/user/check-availability', requestOptions);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error occurred while checking availability");
    }
    return data;
  } catch (error) {
    console.error('Error in checkAvailability:', error);
    throw error;
  }
};

// export.module { signUpEmployee, checkAvailability};