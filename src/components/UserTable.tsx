import { GymUser } from "@/types/gym";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Edit, Trash2, UserPlus, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { UserForm } from "./UserForm";
import { useToast } from "@/hooks/use-toast";

interface UserTableProps {
  users: GymUser[];
  onAddUser: (user: Omit<GymUser, "id">) => void;
  onUpdateUser: (id: string, user: Omit<GymUser, "id">) => void;
  onDeleteUser: (id: string) => void;
}

export const UserTable = ({ users, onAddUser, onUpdateUser, onDeleteUser }: UserTableProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<GymUser | null>(null);
  const { toast } = useToast();

  const handleAdd = (data: Omit<GymUser, "id">) => {
    onAddUser(data);
    setIsAddOpen(false);
    toast({
      title: "Usuario agregado",
      description: "El usuario ha sido agregado exitosamente",
    });
  };

  const handleUpdate = (data: Omit<GymUser, "id">) => {
    if (selectedUser) {
      onUpdateUser(selectedUser.id, data);
      setIsEditOpen(false);
      setSelectedUser(null);
      toast({
        title: "Usuario actualizado",
        description: "El usuario ha sido actualizado exitosamente",
      });
    }
  };

  const handleDelete = () => {
    if (selectedUser) {
      onDeleteUser(selectedUser.id);
      setIsDeleteOpen(false);
      setSelectedUser(null);
      toast({
        title: "Usuario eliminado",
        description: "El usuario ha sido eliminado exitosamente",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsAddOpen(true)} className="gym-button">
          <UserPlus className="mr-2 h-4 w-4" />
          Agregar Usuario
        </Button>
      </div>

      <div className="rounded-md border bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50/50 dark:bg-gray-700/50">
              <TableHead className="font-semibold">Nombre</TableHead>
              <TableHead className="font-semibold">Teléfono</TableHead>
              <TableHead className="font-semibold">Documento</TableHead>
              <TableHead className="font-semibold">Mensualidad</TableHead>
              <TableHead className="font-semibold">Último Pago</TableHead>
              <TableHead className="font-semibold">Observaciones</TableHead>
              <TableHead className="text-right font-semibold">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-blue-50/30 dark:hover:bg-gray-700/30 transition-colors">
                <TableCell className="font-medium">{user.fullName}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.documentId}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                    {user.membershipFee.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  {format(user.lastPaymentDate, "dd 'de' MMMM, yyyy", { locale: es })}
                </TableCell>
                <TableCell>{user.observations}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsEditOpen(true);
                    }}
                    className="hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  >
                    <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDeleteOpen(true);
                    }}
                    className="hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Agregar Usuario
            </DialogTitle>
          </DialogHeader>
          <UserForm
            onSubmit={handleAdd}
            onCancel={() => setIsAddOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Editar Usuario
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <UserForm
              user={selectedUser}
              onSubmit={handleUpdate}
              onCancel={() => {
                setIsEditOpen(false);
                setSelectedUser(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
              ¿Estás seguro?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el usuario
              {selectedUser && ` ${selectedUser.fullName}`} y todos sus datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setIsDeleteOpen(false);
              setSelectedUser(null);
            }}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
