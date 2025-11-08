import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Bell, Calendar, Users, AlertCircle, CheckCircle, Clock, X } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Notification {
  id: string;
  type: "new_reservation" | "cancellation" | "special_request" | "reminder";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "new_reservation",
      title: "Nueva Reserva",
      message: "Isabel Torres ha reservado para 4 personas el 8 de noviembre a las 21:00",
      time: "Hace 5 minutos",
      isRead: false,
      priority: "high"
    },
    {
      id: "2",
      type: "special_request",
      title: "Solicitud Especial",
      message: "Ana Martínez solicita un pastel de cumpleaños para su reserva de hoy",
      time: "Hace 15 minutos",
      isRead: false,
      priority: "high"
    },
    {
      id: "3",
      type: "new_reservation",
      title: "Nueva Reserva",
      message: "Laura Sánchez ha reservado para 2 personas el 8 de noviembre a las 20:00",
      time: "Hace 1 hora",
      isRead: false,
      priority: "medium"
    },
    {
      id: "4",
      type: "reminder",
      title: "Recordatorio de Reserva",
      message: "Pedro Fernández tiene una reserva para 8 personas en 30 minutos",
      time: "Hace 2 horas",
      isRead: true,
      priority: "medium"
    },
    {
      id: "5",
      type: "cancellation",
      title: "Cancelación",
      message: "Roberto Díaz ha cancelado su reserva para 6 personas del 10 de noviembre",
      time: "Hace 3 horas",
      isRead: true,
      priority: "low"
    },
    {
      id: "6",
      type: "new_reservation",
      title: "Nueva Reserva",
      message: "Carmen Ruiz ha reservado para 3 personas el 9 de noviembre a las 19:30",
      time: "Hace 4 horas",
      isRead: true,
      priority: "medium"
    },
  ]);

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "new_reservation":
        return <Calendar className="h-5 w-5 text-[#6fa87d]" />;
      case "cancellation":
        return <X className="h-5 w-5 text-[#c46f6f]" />;
      case "special_request":
        return <AlertCircle className="h-5 w-5 text-[#c4a86f]" />;
      case "reminder":
        return <Clock className="h-5 w-5 text-[#6f9ba8]" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "new_reservation":
        return "bg-[#4a7c59]/20";
      case "cancellation":
        return "bg-[#7a3a3a]/20";
      case "special_request":
        return "bg-[#7a6a3a]/20";
      case "reminder":
        return "bg-[#4a6a7c]/20";
    }
  };

  const getPriorityBadge = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-[#7a3a3a]/20 text-[#c46f6f] border-[#7a3a3a]/30">Alta</Badge>;
      case "medium":
        return <Badge className="bg-[#7a6a3a]/20 text-[#c4a86f] border-[#7a6a3a]/30">Media</Badge>;
      case "low":
        return <Badge className="bg-white/10 text-white/60 border-white/20">Baja</Badge>;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
    );
    toast.success("Notificación marcada como leída");
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    toast.success("Todas las notificaciones marcadas como leídas");
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast.success("Notificación eliminada");
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Card className="bg-[#1a1a1a] border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#4a7c59]/20 rounded-lg">
            <Bell className="h-6 w-6 text-[#6fa87d]" />
          </div>
          <div>
            <h3 className="text-white">Notificaciones</h3>
            <p className="text-white/60">
              {unreadCount > 0 ? `${unreadCount} sin leer` : 'Todas leídas'}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar todas como leídas
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-3 pr-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all ${
                notification.isRead
                  ? 'bg-[#0f0f0f] border-white/10'
                  : 'bg-[#0f0f0f] border-[#4a7c59]/30 shadow-lg shadow-[#4a7c59]/5'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${getNotificationColor(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white">{notification.title}</h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-[#6fa87d] rounded-full" />
                        )}
                      </div>
                      <p className="text-white/70">{notification.message}</p>
                    </div>
                    
                    <Button
                      onClick={() => deleteNotification(notification.id)}
                      variant="ghost"
                      size="icon"
                      className="text-white/40 hover:text-white hover:bg-white/10 -mt-2 -mr-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <span className="text-white/40">{notification.time}</span>
                      {getPriorityBadge(notification.priority)}
                    </div>

                    {!notification.isRead && (
                      <Button
                        onClick={() => markAsRead(notification.id)}
                        variant="ghost"
                        className="text-white/60 hover:text-white hover:bg-white/10 h-8"
                      >
                        Marcar como leída
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {notifications.length === 0 && (
        <div className="flex items-center justify-center h-[400px] text-white/40">
          <div className="text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p>No hay notificaciones</p>
          </div>
        </div>
      )}
    </Card>
  );
}
