import { useState } from "react";
import { mockUsers } from "@/data/mockData";
import { UserTable } from "@/components/UserTable";
import { ExpiredMemberships } from "@/components/ExpiredMemberships";
import { GymUser } from "@/types/gym";
import { Toaster } from "@/components/ui/toaster";
import { Dumbbell, Users, Calendar, AlertTriangle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="gym-container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Dumbbell className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            <h1 className="gym-header">Sistema de Gestión de Gimnasio</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold">{users.length} Miembros</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold">
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
        
        <ExpiredMemberships users={users} />
        
        <div className="gym-card">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold">Usuarios Registrados</h2>
          </div>
          <UserTable 
            users={users}
            onAddUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
