import React, { useContext } from 'react';
import RegisterUser from '../components/registerUser';
import Header from '../components/Header';
import AppContext from '../context/Context';
import '../styles/admin.css';

export default function AdminPage() {
  const { users, setUsers } = useContext(AppContext);

  const removeItem = (id) => {
    const deleteUser = users.filter((e) => e.id !== id);
    setUsers(deleteUser);
  };

  return (
    <div className="div__admin">
      <Header />
      <RegisterUser />
      <h3>Lista de usuários</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && users.map((item, index) => (
            <tr key={ index + item.name } className="body__tr">
              <td
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {item.name}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {item.email}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {item.role}
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  onClick={ () => removeItem(item.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
