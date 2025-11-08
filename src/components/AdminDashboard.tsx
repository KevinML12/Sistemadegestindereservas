import { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { 
  LayoutGrid, 
  Calendar, 
  Users, 
  Bell, 
  Settings,
  ArrowLeft,
  TrendingUp
} from "lucide-react";
import { TodayReservations } from "./admin/TodayReservations";
import { TableMap } from "./admin/TableMap";
import { TableManagement } from "./admin/TableManagement";
import { CustomerHistory } from "./admin/CustomerHistory";
import { Notifications } from "./admin/Notifications";
import { AnalyticsDashboard } from "./admin/AnalyticsDashboard";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for notifications count
  const newReservationsCount = 3;

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => window.location.href = '#home'}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-white">Panel de Administración</h1>
                <p className="text-white/60">Riviera Restaurant</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="bg-[#4a7c59]/20 text-[#6fa87d] border-[#4a7c59]/30">
                {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="h-5 w-5" />
                {newReservationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#c46f6f] text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {newReservationsCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#1a1a1a] border border-white/10 p-1">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-[#4a7c59] data-[state=active]:text-white text-white/60"
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Vista General
            </TabsTrigger>
            <TabsTrigger 
              value="reservations" 
              className="data-[state=active]:bg-[#4a7c59] data-[state=active]:text-white text-white/60"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Reservas
            </TabsTrigger>
            <TabsTrigger 
              value="tables" 
              className="data-[state=active]:bg-[#4a7c59] data-[state=active]:text-white text-white/60"
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Mesas
            </TabsTrigger>
            <TabsTrigger 
              value="customers" 
              className="data-[state=active]:bg-[#4a7c59] data-[state=active]:text-white text-white/60"
            >
              <Users className="h-4 w-4 mr-2" />
              Clientes
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="data-[state=active]:bg-[#4a7c59] data-[state=active]:text-white text-white/60 relative"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notificaciones
              {newReservationsCount > 0 && (
                <Badge className="ml-2 bg-[#c46f6f] text-white border-0 h-5 px-2">
                  {newReservationsCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-[#4a7c59] data-[state=active]:text-white text-white/60"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Analíticas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AnalyticsDashboard />
            <div className="grid lg:grid-cols-2 gap-6">
              <TodayReservations />
              <TableMap compact />
            </div>
          </TabsContent>

          <TabsContent value="reservations">
            <TodayReservations detailed />
          </TabsContent>

          <TabsContent value="tables">
            <div className="space-y-6">
              <TableMap />
              <TableManagement />
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <CustomerHistory />
          </TabsContent>

          <TabsContent value="notifications">
            <Notifications />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard detailed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
