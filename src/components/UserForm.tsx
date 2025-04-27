
import { GymUser } from "@/types/gym";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface UserFormProps {
  user?: GymUser;
  onSubmit: (data: Omit<GymUser, "id">) => void;
  onCancel: () => void;
}

export const UserForm = ({ user, onSubmit, onCancel }: UserFormProps) => {
  const form = useForm<Omit<GymUser, "id">>({
    defaultValues: user ? {
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      documentId: user.documentId,
      membershipFee: user.membershipFee,
      lastPaymentDate: new Date(user.lastPaymentDate),
      observations: user.observations,
    } : {
      fullName: "",
      phoneNumber: "",
      documentId: "",
      membershipFee: 0,
      lastPaymentDate: new Date(),
      observations: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="documentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documento de Identidad</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="membershipFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensualidad</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastPaymentDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Último Pago</FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  {...field}
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {user ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
