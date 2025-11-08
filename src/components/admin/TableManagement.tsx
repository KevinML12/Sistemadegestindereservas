import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface TableData {
  id: string;
  number: string;
  capacity: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
  location: string;
}

export function TableManagement() {
  const [tables, setTables] = useState<TableData[]>([
    { id: "1", number: "1", capacity: 2, status: "available", location: "Ventana" },
    { id: "2", number: "2", capacity: 2, status: "occupied", location: "Interior" },
    { id: "3", number: "3", capacity: 4, status: "available", location: "Ventana" },
    { id: "4", number: "4", capacity: 4, status: "reserved", location: "Interior" },
    { id: "5", number: "5", capacity: 4, status: "occupied", location: "Ventana" },
    { id: "6", number: "6", capacity: 2, status: "cleaning", location: "Interior" },
    { id: "7", number: "7", capacity: 6, status: "available", location: "Centro" },
    { id: "8", number: "8", capacity: 4, status: "reserved", location: "Ventana" },
    { id: "9", number: "9", capacity: 2, status: "available", location: "Interior" },
    { id: "10", number: "10", capacity: 2, status: "available", location: "Interior" },
    { id: "11", number: "11", capacity: 8, status: "occupied", location: "Centro" },
    { id: "12", number: "12", capacity: 2, status: "occupied", location: "Ventana" },
    { id: "13", number: "13", capacity: 4, status: "available", location: "Interior" },
    { id: "14", number: "14", capacity: 4, status: "cleaning", location: "Ventana" },
    { id: "15", number: "15", capacity: 10, status: "reserved", location: "Privado" },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState("");
  const [newTableLocation, setNewTableLocation] = useState("");

  const getStatusBadge = (status: TableData["status"]) => {
    switch (status) {
      case "available":
        return <Badge className="bg-[#4a7c59]/20 text-[#6fa87d] border-[#4a7c59]/30">Disponible</Badge>;
      case "occupied":
        return <Badge className="bg-[#7a3a3a]/20 text-[#c46f6f] border-[#7a3a3a]/30">Ocupada</Badge>;
      case "reserved":
        return <Badge className="bg-[#4a6a7c]/20 text-[#6f9ba8] border-[#4a6a7c]/30">Reservada</Badge>;
      case "cleaning":
        return <Badge className="bg-[#7a6a3a]/20 text-[#c4a86f] border-[#7a6a3a]/30">Limpieza</Badge>;
    }
  };

  const handleAddTable = () => {
    if (!newTableNumber || !newTableCapacity || !newTableLocation) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const newTable: TableData = {
      id: (tables.length + 1).toString(),
      number: newTableNumber,
      capacity: parseInt(newTableCapacity),
      status: "available",
      location: newTableLocation,
    };

    setTables([...tables, newTable]);
    setNewTableNumber("");
    setNewTableCapacity("");
    setNewTableLocation("");
    setIsAddDialogOpen(false);
    toast.success(`Mesa ${newTableNumber} agregada exitosamente`);
  };

  const handleDeleteTable = (id: string) => {
    const table = tables.find(t => t.id === id);
    if (table?.status === "occupied" || table?.status === "reserved") {
      toast.error("No se puede eliminar una mesa ocupada o reservada");
      return;
    }
    
    setTables(tables.filter(t => t.id !== id));
    toast.success("Mesa eliminada");
  };

  const totalCapacity = tables.reduce((sum, table) => sum + table.capacity, 0);
  const availableTables = tables.filter(t => t.status === "available").length;

  return (
    <Card className="bg-[#1a1a1a] border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white mb-1">Gestión de Mesas</h3>
          <p className="text-white/60">
            {tables.length} mesas · {totalCapacity} capacidad total · {availableTables} disponibles
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#4a7c59] hover:bg-[#3d6549] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Mesa
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1a1a1a] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Nueva Mesa</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2">Número de Mesa</Label>
                <Input
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                  placeholder="Ej: 16"
                  className="bg-[#0f0f0f] border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-white mb-2">Capacidad</Label>
                <Input
                  type="number"
                  value={newTableCapacity}
                  onChange={(e) => setNewTableCapacity(e.target.value)}
                  placeholder="Ej: 4"
                  className="bg-[#0f0f0f] border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-white mb-2">Ubicación</Label>
                <Input
                  value={newTableLocation}
                  onChange={(e) => setNewTableLocation(e.target.value)}
                  placeholder="Ej: Ventana, Interior, Centro"
                  className="bg-[#0f0f0f] border-white/10 text-white"
                />
              </div>
              <Button
                onClick={handleAddTable}
                className="w-full bg-[#4a7c59] hover:bg-[#3d6549] text-white"
              >
                Agregar Mesa
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-[#0f0f0f] rounded-lg border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/80">Mesa</TableHead>
              <TableHead className="text-white/80">Capacidad</TableHead>
              <TableHead className="text-white/80">Ubicación</TableHead>
              <TableHead className="text-white/80">Estado</TableHead>
              <TableHead className="text-white/80 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tables.map((table) => (
              <TableRow key={table.id} className="border-white/10 hover:bg-white/5">
                <TableCell className="text-white">Mesa {table.number}</TableCell>
                <TableCell className="text-white/70">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {table.capacity}
                  </div>
                </TableCell>
                <TableCell className="text-white/70">{table.location}</TableCell>
                <TableCell>{getStatusBadge(table.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTable(table.id)}
                      className="text-white/60 hover:text-[#c46f6f] hover:bg-white/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
