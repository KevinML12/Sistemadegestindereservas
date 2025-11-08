import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Search, Star, Calendar, Users, TrendingUp, Mail, Phone } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalVisits: number;
  lastVisit: string;
  totalSpent: number;
  averageGuests: number;
  loyaltyPoints: number;
  tier: "regular" | "silver" | "gold" | "platinum";
  preferences?: string;
}

export function CustomerHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const customers: Customer[] = [
    {
      id: "1",
      name: "María García",
      email: "maria.garcia@email.com",
      phone: "+34 612 345 678",
      totalVisits: 24,
      lastVisit: "2025-11-05",
      totalSpent: 1850,
      averageGuests: 3.5,
      loyaltyPoints: 240,
      tier: "gold",
      preferences: "Mesa junto a la ventana, prefiere vino tinto"
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      email: "carlos.r@email.com",
      phone: "+34 623 456 789",
      totalVisits: 48,
      lastVisit: "2025-11-08",
      totalSpent: 3200,
      averageGuests: 2,
      loyaltyPoints: 480,
      tier: "platinum",
      preferences: "Alérgico a mariscos, siempre pide menú degustación"
    },
    {
      id: "3",
      name: "Ana Martínez",
      email: "ana.m@email.com",
      phone: "+34 634 567 890",
      totalVisits: 12,
      lastVisit: "2025-10-28",
      totalSpent: 890,
      averageGuests: 4,
      loyaltyPoints: 120,
      tier: "silver",
      preferences: "Vegetariana"
    },
    {
      id: "4",
      name: "Jorge López",
      email: "jorge.lopez@email.com",
      phone: "+34 645 678 901",
      totalVisits: 8,
      lastVisit: "2025-11-01",
      totalSpent: 520,
      averageGuests: 2,
      loyaltyPoints: 80,
      tier: "regular"
    },
    {
      id: "5",
      name: "Laura Sánchez",
      email: "laura.s@email.com",
      phone: "+34 656 789 012",
      totalVisits: 36,
      lastVisit: "2025-11-07",
      totalSpent: 2400,
      averageGuests: 2,
      loyaltyPoints: 360,
      tier: "gold",
      preferences: "Prefiere cenas tardías, le gusta el postre de chocolate"
    },
    {
      id: "6",
      name: "Pedro Fernández",
      email: "pedro.f@email.com",
      phone: "+34 667 890 123",
      totalVisits: 15,
      lastVisit: "2025-11-08",
      totalSpent: 1250,
      averageGuests: 6,
      loyaltyPoints: 150,
      tier: "silver",
      preferences: "Organiza eventos empresariales"
    },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const getTierColor = (tier: Customer["tier"]) => {
    switch (tier) {
      case "platinum":
        return "bg-[#a0a0a0]/20 text-[#e0e0e0] border-[#a0a0a0]/30";
      case "gold":
        return "bg-[#c4a86f]/20 text-[#d4b87f] border-[#c4a86f]/30";
      case "silver":
        return "bg-[#9fa8b0]/20 text-[#c0c8d0] border-[#9fa8b0]/30";
      case "regular":
        return "bg-white/10 text-white/60 border-white/20";
    }
  };

  const getTierText = (tier: Customer["tier"]) => {
    switch (tier) {
      case "platinum":
        return "Platino";
      case "gold":
        return "Oro";
      case "silver":
        return "Plata";
      case "regular":
        return "Regular";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Customer List */}
      <Card className="lg:col-span-1 bg-[#1a1a1a] border-white/10 p-6">
        <div className="mb-6">
          <h3 className="text-white mb-3">Clientes</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar clientes..."
              className="pl-10 bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/40"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2 pr-4">
            {filteredCustomers.map((customer) => (
              <button
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`w-full text-left p-4 rounded-lg border transition-all hover:border-white/30 ${
                  selectedCustomer?.id === customer.id
                    ? 'bg-[#4a7c59]/20 border-[#4a7c59]'
                    : 'bg-[#0f0f0f] border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-10 w-10 bg-[#4a7c59]/20">
                    <AvatarFallback className="text-[#6fa87d]">
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white truncate">{customer.name}</h4>
                    <p className="text-white/60 truncate">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className={getTierColor(customer.tier)}>
                    {getTierText(customer.tier)}
                  </Badge>
                  <span className="text-white/60">{customer.totalVisits} visitas</span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Customer Details */}
      <Card className="lg:col-span-2 bg-[#1a1a1a] border-white/10 p-6">
        {selectedCustomer ? (
          <div>
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 bg-[#4a7c59]/20">
                  <AvatarFallback className="text-[#6fa87d]">
                    {getInitials(selectedCustomer.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white mb-1">{selectedCustomer.name}</h3>
                  <Badge className={getTierColor(selectedCustomer.tier)}>
                    Cliente {getTierText(selectedCustomer.tier)}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-[#c4a86f] mb-1">
                  <Star className="h-5 w-5 fill-current" />
                  <span>{selectedCustomer.loyaltyPoints} puntos</span>
                </div>
                <p className="text-white/60">{selectedCustomer.totalVisits} visitas totales</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h4 className="text-white mb-4">Información de Contacto</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="h-4 w-4" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="h-4 w-4" />
                  <span>{selectedCustomer.phone}</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="mb-6">
              <h4 className="text-white mb-4">Estadísticas</h4>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-[#0f0f0f] p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 text-white/60 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Última Visita</span>
                  </div>
                  <p className="text-white">
                    {new Date(selectedCustomer.lastVisit).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </p>
                </div>

                <div className="bg-[#0f0f0f] p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 text-white/60 mb-2">
                    <Users className="h-4 w-4" />
                    <span>Promedio</span>
                  </div>
                  <p className="text-white">{selectedCustomer.averageGuests} personas</p>
                </div>

                <div className="bg-[#0f0f0f] p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 text-white/60 mb-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Gasto Total</span>
                  </div>
                  <p className="text-white">€{selectedCustomer.totalSpent}</p>
                </div>

                <div className="bg-[#0f0f0f] p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 text-white/60 mb-2">
                    <Star className="h-4 w-4" />
                    <span>Puntos</span>
                  </div>
                  <p className="text-white">{selectedCustomer.loyaltyPoints}</p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            {selectedCustomer.preferences && (
              <div className="mb-6">
                <h4 className="text-white mb-3">Preferencias y Notas</h4>
                <div className="bg-[#0f0f0f] p-4 rounded-lg border border-white/10">
                  <p className="text-white/70">{selectedCustomer.preferences}</p>
                </div>
              </div>
            )}

            {/* Recent Reservations */}
            <div>
              <h4 className="text-white mb-4">Historial de Reservas Recientes</h4>
              <div className="space-y-3">
                {[
                  { date: "2025-11-08", time: "20:00", guests: 2, status: "completed" },
                  { date: "2025-10-25", time: "19:30", guests: 2, status: "completed" },
                  { date: "2025-10-12", time: "21:00", guests: 4, status: "completed" },
                  { date: "2025-09-28", time: "20:30", guests: 2, status: "completed" },
                ].map((reservation, index) => (
                  <div
                    key={index}
                    className="bg-[#0f0f0f] p-4 rounded-lg border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-white">
                        {new Date(reservation.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="text-white/60">·</div>
                      <div className="text-white/60">{reservation.time}</div>
                      <div className="text-white/60">·</div>
                      <div className="text-white/60">{reservation.guests} personas</div>
                    </div>
                    <Badge className="bg-[#4a7c59]/20 text-[#6fa87d] border-[#4a7c59]/30">
                      Completada
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px] text-white/40">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>Selecciona un cliente para ver sus detalles</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
