
import { mockUsers } from "@/data/mockData";
import { UserTable } from "@/components/UserTable";
import { ExpiredMemberships } from "@/components/ExpiredMemberships";

const Index = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Sistema de Gestión de Gimnasio</h1>
      
      <ExpiredMemberships users={mockUsers} />
      
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Usuarios Registrados</h2>
        <UserTable users={mockUsers} />
      </div>
    </div>
  );
};

export default Index;
