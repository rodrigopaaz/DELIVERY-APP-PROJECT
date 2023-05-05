import { setToken } from '../services/requests';

const handleToken = ({ token, role }) => {
  setToken(token);
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
};
export default handleToken;
