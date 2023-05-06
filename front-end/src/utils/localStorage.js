import { setToken } from '../services/requests';

const handleToken = ({ token, name, email, role }) => {
  setToken(token);
  const user = { name, email, role, token };
  localStorage.setItem('user', JSON.stringify(user));
};
export default handleToken;
