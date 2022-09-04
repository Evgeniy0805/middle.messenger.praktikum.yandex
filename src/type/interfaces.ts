interface AuthData {
    login: string,
    password: string
};

interface RegData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
  display_name: string
};

interface PassData {
  oldPassword: string,
  newPassword: string
};

interface ChatData {
  title: string
};

interface ChatsData {
  offset: number,
  limit: number,
  title: string
};

interface UserData {
  offset: number,
  limit: number,
  title: string
};

export { AuthData, RegData, PassData, ChatData, ChatsData, UserData };