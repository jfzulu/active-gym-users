
import { GymUser } from "@/types/gym";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface UserTableProps {
  users: GymUser[];
}

export const UserTable = ({ users }: UserTableProps) => {
  return (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
