
import { GymUser } from "@/types/gym";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ExpiredMembershipsProps {
  users: GymUser[];
}

export const ExpiredMemberships = ({ users }: ExpiredMembershipsProps) => {
  const today = new Date();
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const expiredUsers = users.filter(
    (user) => today.getTime() - user.lastPaymentDate.getTime() > thirtyDaysInMs
  );

  if (expiredUsers.length === 0) return null;

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Membresías Vencidas</AlertTitle>
      <AlertDescription>
        Los siguientes usuarios tienen su membresía vencida:
        <ul className="mt-2 list-disc list-inside">
          {expiredUsers.map((user) => (
            <li key={user.id}>{user.fullName}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};
