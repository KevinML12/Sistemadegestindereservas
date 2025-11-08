import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle,
  MoreVertical,
  MessageSquare
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner@2.0.3";

interface Reservation {
  id: string;
  time: string;
  name: string;
  guests: number;
  phone: string;
  email: string;
  table?: string;
  status: "confirmed" | "pending" | "seated" | "completed" | "cancelled";
  specialRequests?: string;
}

interface TodayReservationsProps {
  detailed?: boolean;
}

export function TodayReservations({ detailed = false }: TodayReservationsProps) {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      time: "12:30",
      name: "María García",
      guests: 4,
      phone: "+34 612 345 678",
      email: "maria.garcia@email.com",
      table: "5",
      status: "confirmed",
      specialRequests: "Mesa junto a la ventana"
    },
    {
      id: "2",
      time: "13:00",
      name: "Carlos Rodríguez",
      guests: 2,
      phone: "+34 623 456 789",
      email: "carlos.r@email.com",
      table: "12",
      status: "confirmed"
    },
    {
      id: "3",
      time: "14:00",
      name: "Ana Martínez",
      guests: 6,
      phone: "+34 634 567 890",
      email: "ana.m@email.com",
      status: "pending",
      specialRequests: "Cumpleaños, necesitan pastel"
    },
    {
      id: "4",
      time: "19:30",
      name: "Jorge López",
      guests: 3,
      phone: "+34 645 678 901",
      email: "jorge.lopez@email.com",
      table: "8",
      status: "confirmed"
    },
    {
      id: "5",
      time: "20:00",
      name: "Laura Sánchez",
      guests: 2,
      phone: "+34 656 789 012",
      email: "laura.s@email.com",
      status: "pending"
    },
    {
      id: "6",
      time: "20:30",
      name: "Pedro Fernández",
      guests: 8,
      phone: "+34 667 890 123",
      email: "pedro.f@email.com",
      table: "15",
      status: "confirmed",
      specialRequests: "Menú vegetariano para 3 personas"
    },
    {
      id: "7",
      time: "21:00",
      name: "Isabel Torres",
      guests: 4,
      phone: "+34 678 901 234",
      email: "isabel.t@email.com",
      status: "pending"
    },
  ]);

  const getStatusColor = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-[#4a7c59]/20 text-[#6fa87d] border-[#4a7c59]/30";
      case "pending":
        return "bg-[#7a6a3a]/20 text-[#c4a86f] border-[#7a6a3a]/30";
      case "seated":
        return "bg-[#4a6a7c]/20 text-[#6f9ba8] border-[#4a6a7c]/30";
      case "completed":
        return "bg-white/10 text-white/60 border-white/20";
      case "cancelled":
        return "bg-[#7a3a3a]/20 text-[#c46f6f] border-[#7a3a3a]/30";
    }
  };

  const getStatusText = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente";
      case "seated":
        return "En mesa";
      case "completed":
        return "Completada";
      case "cancelled":
        return "Cancelada";
    }
  };

  const handleStatusChange = (id: string, status: Reservation["status"]) => {
    setReservations(prev =>
      prev.map(res => res.id === id ? { ...res, status } : res)
    );
    toast.success(`Reserva ${getStatusText(status).toLowerCase()}`);
  };

  const handleAssignTable = (id: string, table: string) => {
    setReservations(prev =>
      prev.map(res => res.id === id ? { ...res, table } : res)
    );
    toast.success(`Mesa ${table} asignada`);
  };

  const totalGuests = reservations.reduce((sum, res) => sum + res.guests, 0);
  const confirmedCount = reservations.filter(r => r.status === "confirmed").length;

  return (
    <Card className="bg-[#1a1a1a] border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white mb-1">Reservas de Hoy</h3>
          <p className="text-white/60">
            {reservations.length} reservas · {confirmedCount} confirmadas · {totalGuests} comensales
          </p>
        </div>
      </div>

      <ScrollArea className={detailed ? "h-[calc(100vh-250px)]" : "h-[400px]"}>
        <div className="space-y-3 pr-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-[#0f0f0f] p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#4a7c59]/20 rounded-lg">
                    <Clock className="h-5 w-5 text-[#6fa87d]" />
                  </div>
                  <div>
                    <h4 className="text-white">{reservation.name}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-white/60">{reservation.time}</span>
                      <Badge className={getStatusColor(reservation.status)}>
                        {getStatusText(reservation.status)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1a1a1a] border-white/10 text-white">
                    <DropdownMenuItem 
                      onClick={() => handleStatusChange(reservation.id, "confirmed")}
                      className="focus:bg-white/10"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirmar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleStatusChange(reservation.id, "seated")}
                      className="focus:bg-white/10"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Marcar como sentados
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleStatusChange(reservation.id, "completed")}
                      className="focus:bg-white/10"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleStatusChange(reservation.id, "cancelled")}
                      className="focus:bg-white/10 text-[#c46f6f]"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancelar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center gap-2 text-white/60">
                  <Users className="h-4 w-4" />
                  <span>{reservation.guests} personas</span>
                </div>
                {reservation.table && (
                  <div className="flex items-center gap-2 text-white/60">
                    <span>Mesa {reservation.table}</span>
                  </div>
                )}
              </div>

              {detailed && (
                <>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-white/60">
                      <Phone className="h-4 w-4" />
                      <span>{reservation.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Mail className="h-4 w-4" />
                      <span>{reservation.email}</span>
                    </div>
                  </div>

                  {reservation.specialRequests && (
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-start gap-2 text-white/60">
                        <MessageSquare className="h-4 w-4 mt-0.5" />
                        <p>{reservation.specialRequests}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
