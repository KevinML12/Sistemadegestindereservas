import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Users } from "lucide-react";

interface Table {
  id: string;
  number: string;
  capacity: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
  position: { x: number; y: number };
  currentGuests?: number;
  reservationTime?: string;
}

interface TableMapProps {
  compact?: boolean;
}

export function TableMap({ compact = false }: TableMapProps) {
  const [tables, setTables] = useState<Table[]>([
    { id: "1", number: "1", capacity: 2, status: "available", position: { x: 10, y: 10 } },
    { id: "2", number: "2", capacity: 2, status: "occupied", position: { x: 30, y: 10 }, currentGuests: 2 },
    { id: "3", number: "3", capacity: 4, status: "available", position: { x: 50, y: 10 } },
    { id: "4", number: "4", capacity: 4, status: "reserved", position: { x: 70, y: 10 }, reservationTime: "19:30" },
    
    { id: "5", number: "5", capacity: 4, status: "occupied", position: { x: 10, y: 35 }, currentGuests: 4 },
    { id: "6", number: "6", capacity: 2, status: "cleaning", position: { x: 30, y: 35 } },
    { id: "7", number: "7", capacity: 6, status: "available", position: { x: 50, y: 35 } },
    { id: "8", number: "8", capacity: 4, status: "reserved", position: { x: 70, y: 35 }, reservationTime: "20:00" },
    
    { id: "9", number: "9", capacity: 2, status: "available", position: { x: 10, y: 60 } },
    { id: "10", number: "10", capacity: 2, status: "available", position: { x: 30, y: 60 } },
    { id: "11", number: "11", capacity: 8, status: "occupied", position: { x: 50, y: 60 }, currentGuests: 6 },
    { id: "12", number: "12", capacity: 2, status: "occupied", position: { x: 70, y: 60 }, currentGuests: 2 },
    
    { id: "13", number: "13", capacity: 4, status: "available", position: { x: 10, y: 85 } },
    { id: "14", number: "14", capacity: 4, status: "cleaning", position: { x: 30, y: 85 } },
    { id: "15", number: "15", capacity: 10, status: "reserved", position: { x: 55, y: 85 }, reservationTime: "21:00" },
  ]);

  const getStatusColor = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "bg-[#4a7c59] border-[#6fa87d]";
      case "occupied":
        return "bg-[#7a3a3a] border-[#c46f6f]";
      case "reserved":
        return "bg-[#4a6a7c] border-[#6f9ba8]";
      case "cleaning":
        return "bg-[#7a6a3a] border-[#c4a86f]";
    }
  };

  const getStatusText = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "Disponible";
      case "occupied":
        return "Ocupada";
      case "reserved":
        return "Reservada";
      case "cleaning":
        return "Limpieza";
    }
  };

  const statusCounts = {
    available: tables.filter(t => t.status === "available").length,
    occupied: tables.filter(t => t.status === "occupied").length,
    reserved: tables.filter(t => t.status === "reserved").length,
    cleaning: tables.filter(t => t.status === "cleaning").length,
  };

  const handleTableClick = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;

    // Cycle through statuses
    const statusCycle: Table["status"][] = ["available", "occupied", "reserved", "cleaning"];
    const currentIndex = statusCycle.indexOf(table.status);
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];

    setTables(prev =>
      prev.map(t => t.id === tableId ? { ...t, status: nextStatus } : t)
    );
  };

  return (
    <Card className="bg-[#1a1a1a] border-white/10 p-6">
      <div className="mb-6">
        <h3 className="text-white mb-3">Mapa de Mesas</h3>
        
        {/* Status Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#4a7c59]" />
            <span className="text-white/60">Disponibles ({statusCounts.available})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#7a3a3a]" />
            <span className="text-white/60">Ocupadas ({statusCounts.occupied})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#4a6a7c]" />
            <span className="text-white/60">Reservadas ({statusCounts.reserved})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#7a6a3a]" />
            <span className="text-white/60">Limpieza ({statusCounts.cleaning})</span>
          </div>
        </div>
      </div>

      {/* Table Map */}
      <div className={`bg-[#0f0f0f] rounded-lg border border-white/10 p-8 ${compact ? 'h-[400px]' : 'h-[600px]'} relative overflow-auto`}>
        {tables.map((table) => (
          <Button
            key={table.id}
            onClick={() => handleTableClick(table.id)}
            className={`
              absolute p-4 rounded-lg border-2 transition-all hover:scale-105
              ${getStatusColor(table.status)}
              ${table.capacity >= 8 ? 'w-32 h-24' : table.capacity >= 4 ? 'w-24 h-20' : 'w-20 h-16'}
            `}
            style={{
              left: `${table.position.x}%`,
              top: `${table.position.y}%`,
            }}
          >
            <div className="text-center">
              <div className="text-white mb-1">Mesa {table.number}</div>
              <div className="flex items-center justify-center gap-1 text-white/80">
                <Users className="h-3 w-3" />
                <span>{table.currentGuests || table.capacity}</span>
              </div>
              {table.reservationTime && (
                <div className="text-white/60 mt-1">{table.reservationTime}</div>
              )}
            </div>
          </Button>
        ))}

        {/* Restaurant Layout Elements */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/40 border border-white/10 px-4 py-2 rounded">
          Entrada
        </div>
        <div className="absolute bottom-4 left-4 text-white/40 border border-white/10 px-4 py-2 rounded">
          Cocina
        </div>
        <div className="absolute bottom-4 right-4 text-white/40 border border-white/10 px-4 py-2 rounded">
          Baños
        </div>
      </div>

      {!compact && (
        <div className="mt-4 p-4 bg-[#0f0f0f] rounded-lg border border-white/10">
          <p className="text-white/60">
            💡 Haz clic en una mesa para cambiar su estado
          </p>
        </div>
      )}
    </Card>
  );
}
