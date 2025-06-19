import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UsersCrud.css";

type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

const UsersCrud = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<Omit<User, "id">>({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  // Carregar usuários do backend
  const fetchUsers = async () => {
    const { data } = await axios.get<User[]>("http://localhost:3000/users");
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Adicionar ou atualizar usuário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      await axios.put(`http://localhost:3000/users/${editingUser.id}`, form);
      setEditingUser(null);
    } else {
      await axios.post("http://localhost:3000/users", form);
    }
    setForm({ name: "", email: "", password: "" });
    fetchUsers();
  };

  // Editar usuário
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, password: "" });
  };

  // Deletar usuário
  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    fetchUsers();
  };

  // Cancelar edição
  const handleCancel = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div>
      {/* Header igual ao Home, mas só com Login */}
    <header className="header">
  <div className="search-bar">
    <button className="button-large" onClick={() => navigate("/")}>
      Login
    </button>
  </div>
</header>

      <div className="p-4 max-w-xl mx-auto text-white">
        <h1 className="text-2xl font-bold mb-4">Gerenciar Usuários</h1>
        <form onSubmit={handleSubmit} className="mb-4 space-y-2">
          <input
            className="input input-large"
            placeholder="Nome"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            className="input input-large"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <input
            className="input input-large"
            placeholder="Senha"
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required={!editingUser}
          />
          <div className="space-x-2">
            <button className="bg-green-600 px-3 py-1 rounded" type="submit">
              {editingUser ? "Salvar" : "Adicionar"}
            </button>
            {editingUser && (
              <button className="bg-gray-500 px-3 py-1 rounded" type="button" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-4 bg-gray-800 rounded flex justify-between items-center"
            >
              <div>
                <p><strong>Nome:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="bg-yellow-500 px-3 py-1 rounded"
                  onClick={() => handleEdit(user)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 px-3 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersCrud;