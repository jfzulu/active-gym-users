
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
import { Edit, Trash2, UserPlus } from "lucide-react";
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
        <Button onClick={() => setIsAddOpen(true)}>
          <UserPlus className="mr-2" />
          Agregar Usuario
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Mensualidad</TableHead>
              <TableHead>Último Pago</TableHead>
              <TableHead>Observaciones</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.documentId}</TableCell>
                <TableCell>${user.membershipFee.toLocaleString()}</TableCell>
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
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Usuario</DialogTitle>
          </DialogHeader>
          <UserForm
            onSubmit={handleAdd}
            onCancel={() => setIsAddOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
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
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
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
            <AlertDialogAction onClick={handleDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
