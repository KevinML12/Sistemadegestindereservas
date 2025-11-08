import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Calendar, 
  DollarSign,
  Clock,
  Star
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface AnalyticsDashboardProps {
  detailed?: boolean;
}

export function AnalyticsDashboard({ detailed = false }: AnalyticsDashboardProps) {
  const weeklyReservations = [
    { day: "Lun", reservations: 28, revenue: 1680 },
    { day: "Mar", reservations: 32, revenue: 1920 },
    { day: "Mié", reservations: 35, revenue: 2100 },
    { day: "Jue", reservations: 42, revenue: 2520 },
    { day: "Vie", reservations: 58, revenue: 3480 },
    { day: "Sáb", reservations: 65, revenue: 3900 },
    { day: "Dom", reservations: 48, revenue: 2880 },
  ];

  const timeSlotData = [
    { time: "12:00-14:00", reservations: 45 },
    { time: "14:00-16:00", reservations: 28 },
    { time: "16:00-18:00", reservations: 12 },
    { time: "18:00-20:00", reservations: 38 },
    { time: "20:00-22:00", reservations: 82 },
    { time: "22:00-00:00", reservations: 35 },
  ];

  const guestDistribution = [
    { name: "1-2 personas", value: 45, color: "#6fa87d" },
    { name: "3-4 personas", value: 35, color: "#6f9ba8" },
    { name: "5-6 personas", value: 15, color: "#c4a86f" },
    { name: "7+ personas", value: 5, color: "#c46f6f" },
  ];

  const stats = [
    {
      title: "Reservas esta Semana",
      value: "308",
      change: "+12%",
      trending: "up",
      icon: Calendar,
      color: "#6fa87d"
    },
    {
      title: "Ingresos Estimados",
      value: "€18,480",
      change: "+8%",
      trending: "up",
      icon: DollarSign,
      color: "#6f9ba8"
    },
    {
      title: "Tasa de Ocupación",
      value: "87%",
      change: "+5%",
      trending: "up",
      icon: Users,
      color: "#c4a86f"
    },
    {
      title: "Hora Pico",
      value: "20:00-22:00",
      change: "82 reservas",
      trending: "neutral",
      icon: Clock,
      color: "#9fa8b0"
    },
  ];

  const topCustomers = [
    { name: "Carlos Rodríguez", visits: 48, spent: 3200, tier: "platinum" },
    { name: "Laura Sánchez", visits: 36, spent: 2400, tier: "gold" },
    { name: "María García", visits: 24, spent: 1850, tier: "gold" },
    { name: "Pedro Fernández", visits: 15, spent: 1250, tier: "silver" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-[#1a1a1a] border-white/10 p-6">
            <div className="flex items-start justify-between mb-4">
              <div 
                className="p-3 rounded-lg" 
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              {stat.trending !== "neutral" && (
                <Badge className={
                  stat.trending === "up" 
                    ? "bg-[#4a7c59]/20 text-[#6fa87d] border-[#4a7c59]/30" 
                    : "bg-[#7a3a3a]/20 text-[#c46f6f] border-[#7a3a3a]/30"
                }>
                  {stat.trending === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {stat.change}
                </Badge>
              )}
            </div>
            <h3 className="text-white mb-1">{stat.value}</h3>
            <p className="text-white/60">{stat.title}</p>
            {stat.trending === "neutral" && (
              <p className="text-white/40 mt-2">{stat.change}</p>
            )}
          </Card>
        ))}
      </div>

      {detailed && (
        <>
          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Reservations */}
            <Card className="bg-[#1a1a1a] border-white/10 p-6">
              <h3 className="text-white mb-6">Reservas por Día</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyReservations}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fill: 'rgba(255,255,255,0.6)' }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fill: 'rgba(255,255,255,0.6)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend wrapperStyle={{ color: '#fff' }} />
                  <Line 
                    type="monotone" 
                    dataKey="reservations" 
                    stroke="#6fa87d" 
                    strokeWidth={2}
                    name="Reservas"
                    dot={{ fill: '#6fa87d' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Time Slot Distribution */}
            <Card className="bg-[#1a1a1a] border-white/10 p-6">
              <h3 className="text-white mb-6">Reservas por Horario</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeSlotData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fill: 'rgba(255,255,255,0.6)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar 
                    dataKey="reservations" 
                    fill="#6f9ba8" 
                    radius={[8, 8, 0, 0]}
                    name="Reservas"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Second Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Guest Distribution */}
            <Card className="bg-[#1a1a1a] border-white/10 p-6">
              <h3 className="text-white mb-6">Distribución de Comensales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={guestDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {guestDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {guestDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white/70">{item.name}</span>
                    </div>
                    <span className="text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Customers */}
            <Card className="lg:col-span-2 bg-[#1a1a1a] border-white/10 p-6">
              <h3 className="text-white mb-6">Mejores Clientes</h3>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div 
                    key={index}
                    className="bg-[#0f0f0f] p-4 rounded-lg border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4a7c59]/20">
                        <span className="text-[#6fa87d]">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-white mb-1">{customer.name}</h4>
                        <div className="flex items-center gap-4 text-white/60">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {customer.visits} visitas
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            €{customer.spent}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={
                      customer.tier === "platinum" 
                        ? "bg-[#a0a0a0]/20 text-[#e0e0e0] border-[#a0a0a0]/30"
                        : customer.tier === "gold"
                        ? "bg-[#c4a86f]/20 text-[#d4b87f] border-[#c4a86f]/30"
                        : "bg-[#9fa8b0]/20 text-[#c0c8d0] border-[#9fa8b0]/30"
                    }>
                      <Star className="h-3 w-3 mr-1" />
                      {customer.tier === "platinum" ? "Platino" : customer.tier === "gold" ? "Oro" : "Plata"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
