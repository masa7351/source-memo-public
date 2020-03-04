/**
 * Save user info to local storage.
 * Keep logged in when browser reloads.
 * @param user user info
 */
export const saveUserToStorage = (user: firebase.User) => {
  const data = {
    user,
    // expired: Date.now() + 6000 // + 1minute
    expired: Date.now() + 3600000 // + 1h
  };
  localStorage.setItem('user', JSON.stringify(data));
};

/**
 * Get user info from local storage
 * @returns user info
 */
export const getUserFromStorage = (): firebase.User | null => {
  const data = localStorage.getItem('user');
  if (data) {
    const parsedData = JSON.parse(data);
    return parsedData.expired >= Date.now() ? parsedData.user : null;
  } else {
    return null;
  }
};

/**
 * Remove user info from local storage.
 */
export const removeUser = () => {
  localStorage.removeItem('user');
};
