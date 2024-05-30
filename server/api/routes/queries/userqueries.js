export const selectAllUsers = 'SELECT * FROM _user';

export const selectUserById =
  'SELECT user_id, FIRST_NAME, LAST_NAME, User_email, UserName FROM _USER WHERE USER_ID = $1';

export const postNewUser = `INSERT INTO _USER (
    FIRST_NAME, 
    LAST_NAME, 
    USER_PASSWORD, 
    User_email, 
    UserName ) 
    VALUES (
      $1, 
      $2, 
      $3, 
      $4, 
      $5) 
      RETURNING *`;

export const editUserById =
  'UPDATE _USER SET FIRST_NAME = $1, LAST_NAME = $2, User_email = $3, UserName = $4 WHERE user_id = $5';

export const selectSingleUserId =
  'SELECT USER_ID FROM _USER WHERE USER_ID = $1';

export const selectIdForGuest =
  "SELECT USER_ID, USERNAME FROM _USER WHERE UserName = 'guest'";

export const deleteUserById = 'DELETE FROM _USER WHERE user_id = $1';
