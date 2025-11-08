import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { toast } from "sonner@2.0.3";
import { Check, Clock, Users, Calendar as CalendarIcon, User, Mail, Phone, MessageSquare } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
}

export function ReservationModal({ isOpen, onClose, selectedDate }: ReservationModalProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"
  ];

  const guestOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const handleConfirm = () => {
    if (!date || !time || !guests || !name || !email || !phone) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    toast.success("¡Reserva confirmada!", {
      description: `Tu reserva para ${guests} personas el ${date.toLocaleDateString('es-ES')} a las ${time} ha sido confirmada.`,
    });
    
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setStep(1);
    setTime("");
    setGuests("");
    setName("");
    setEmail("");
    setPhone("");
    setSpecialRequests("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-[#1a1a1a] border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">
            {step === 1 ? "Selecciona Fecha y Hora" : "Información de Contacto"}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#6fa87d]' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 1 ? 'border-[#6fa87d] bg-[#4a7c59]/20' : 'border-white/20'
            }`}>
              {step > 1 ? <Check className="h-4 w-4" /> : '1'}
            </div>
            <span>Fecha & Hora</span>
          </div>
          
          <div className="w-12 h-[2px] bg-white/20" />
          
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#6fa87d]' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 2 ? 'border-[#6fa87d] bg-[#4a7c59]/20' : 'border-white/20'
            }`}>
              2
            </div>
            <span>Detalles</span>
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            {/* Date Selection */}
            <div>
              <Label className="text-white mb-3 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Fecha de Reserva
              </Label>
              <div className="bg-[#0f0f0f] p-4 rounded-lg border border-white/10">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg text-white w-full"
                  disabled={(date) => date < new Date()}
                />
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <Label className="text-white mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Hora
              </Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="bg-[#0f0f0f] border-white/10 text-white">
                  <SelectValue placeholder="Selecciona una hora" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot} className="focus:bg-white/10">
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Guests */}
            <div>
              <Label className="text-white mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Número de Personas
              </Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="bg-[#0f0f0f] border-white/10 text-white">
                  <SelectValue placeholder="Selecciona número de comensales" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                  {guestOptions.map((num) => (
                    <SelectItem key={num} value={num} className="focus:bg-white/10">
                      {num} {num === "1" ? "persona" : "personas"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!date || !time || !guests}
              className="w-full bg-[#4a7c59] hover:bg-[#3d6549] text-white py-6 h-auto"
            >
              Continuar
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <Label className="text-white mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Nombre Completo *
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div>
              <Label className="text-white mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div>
              <Label className="text-white mb-3 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Teléfono *
              </Label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+34 600 000 000"
                className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div>
              <Label className="text-white mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Solicitudes Especiales (Opcional)
              </Label>
              <Textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Alergias, preferencias de mesa, celebraciones..."
                className="bg-[#0f0f0f] border-white/10 text-white placeholder:text-white/40 min-h-[100px]"
              />
            </div>

            {/* Summary */}
            <div className="bg-[#0f0f0f] p-4 rounded-lg border border-white/10 space-y-2">
              <h4 className="text-white mb-3">Resumen de Reserva</h4>
              <div className="flex items-center gap-3 text-white/70">
                <CalendarIcon className="h-4 w-4" />
                <span>{date?.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Clock className="h-4 w-4" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Users className="h-4 w-4" />
                <span>{guests} {guests === "1" ? "persona" : "personas"}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Atrás
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-[#4a7c59] hover:bg-[#3d6549] text-white py-6 h-auto"
              >
                Confirmar Reserva
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
