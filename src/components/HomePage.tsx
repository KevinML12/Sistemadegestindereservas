import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar as CalendarIcon, Users, Clock, ChevronRight } from "lucide-react";
import { ReservationModal } from "./ReservationModal";

export function HomePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for high-demand days
  const highDemandDays = [
    new Date(2025, 10, 14), // Friday
    new Date(2025, 10, 15), // Saturday
    new Date(2025, 10, 21),
    new Date(2025, 10, 22),
  ];

  const fullyBookedDays = [
    new Date(2025, 10, 15), // Saturday
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f0f0f]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white mb-1">Riviera Restaurant</h1>
              <p className="text-white/60">Experiencia culinaria excepcional</p>
            </div>
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => window.location.href = '#admin'}
            >
              Acceso Administrador
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-[#4a7c59]/20 text-[#6fa87d] border-[#4a7c59]/30 hover:bg-[#4a7c59]/30">
              Reservas Abiertas
            </Badge>
            <h2 className="text-white mb-6">
              Reserva tu experiencia
            </h2>
            <p className="text-white/70 mb-12 max-w-2xl mx-auto">
              Disfruta de una experiencia gastronómica única en un ambiente sofisticado. 
              Nuestro equipo está listo para atenderte con el más alto estándar de calidad.
            </p>
            <Button 
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-[#4a7c59] hover:bg-[#3d6549] text-white px-8 py-6 h-auto group"
            >
              Hacer una Reserva
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-white mb-3">
                Ver Disponibilidad
              </h3>
              <p className="text-white/60">
                Selecciona una fecha para ver la disponibilidad y hacer tu reserva
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Calendar */}
              <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-xl text-white w-full"
                  modifiers={{
                    highDemand: highDemandDays,
                    fullyBooked: fullyBookedDays,
                  }}
                  modifiersStyles={{
                    highDemand: {
                      backgroundColor: '#6fa87d30',
                      color: '#6fa87d',
                    },
                    fullyBooked: {
                      backgroundColor: '#7a3a3a30',
                      color: '#c46f6f',
                      textDecoration: 'line-through',
                    },
                  }}
                />
                
                {/* Legend */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#6fa87d30] border border-[#6fa87d]" />
                    <span className="text-white/70">Alta demanda</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#7a3a3a30] border border-[#c46f6f]" />
                    <span className="text-white/70">Completamente reservado</span>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-6">
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#4a7c59]/20 rounded-lg">
                      <CalendarIcon className="h-6 w-6 text-[#6fa87d]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Fecha Seleccionada</h4>
                      <p className="text-white/60">
                        {date ? date.toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : 'Selecciona una fecha'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#4a7c59]/20 rounded-lg">
                      <Clock className="h-6 w-6 text-[#6fa87d]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Horarios Disponibles</h4>
                      <p className="text-white/60">
                        Almuerzo: 12:00 - 15:30<br />
                        Cena: 19:00 - 23:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#4a7c59]/20 rounded-lg">
                      <Users className="h-6 w-6 text-[#6fa87d]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-2">Capacidad</h4>
                      <p className="text-white/60">
                        Grupos de 1 a 12 personas<br />
                        Eventos especiales bajo consulta
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#4a7c59] hover:bg-[#3d6549] text-white py-6 h-auto"
                  disabled={!date}
                >
                  Continuar con la Reserva
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-white mb-2">Confirmación Instantánea</h4>
              <p className="text-white/60">
                Recibe la confirmación de tu reserva al momento
              </p>
            </div>
            <div>
              <h4 className="text-white mb-2">Menú Exclusivo</h4>
              <p className="text-white/60">
                Descubre nuestra selección de platillos únicos
              </p>
            </div>
            <div>
              <h4 className="text-white mb-2">Ambiente Premium</h4>
              <p className="text-white/60">
                Experiencia gastronómica de primera clase
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Modal */}
      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        selectedDate={date}
      />
    </div>
  );
}
