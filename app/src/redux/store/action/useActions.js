export const saveUserData = data => {
  return {
    type: 'SAVE_USER_DATA',
    payload: data,
  };
};
