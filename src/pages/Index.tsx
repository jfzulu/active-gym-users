
import { useState } from "react";
import { mockUsers } from "@/data/mockData";
import { UserTable } from "@/components/UserTable";
import { ExpiredMemberships } from "@/components/ExpiredMemberships";
import { GymUser } from "@/types/gym";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [users, setUsers] = useState<GymUser[]>(mockUsers);

  const handleAddUser = (userData: Omit<GymUser, "id">) => {
    const newUser = {
      ...userData,
      id: crypto.randomUUID(),
    };
    setUsers([...users, newUser]);
  };

  const handleUpdateUser = (id: string, userData: Omit<GymUser, "id">) => {
    setUsers(users.map((user) => 
      user.id === id ? { ...userData, id } : user
    ));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Sistema de Gestión de Gimnasio</h1>
      
      <ExpiredMemberships users={users} />
      
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Usuarios Registrados</h2>
        <UserTable 
          users={users}
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
