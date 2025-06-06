import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-elysian-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-elysian-white mb-4">
            Contacto
          </h1>
          <p className="text-elysian-white-soft text-lg max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para
            ayudarte. Contáctanos y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-elysian-dark border-elysian-gold/20">
            <CardHeader>
              <CardTitle className="text-elysian-white">
                Envíanos un mensaje
              </CardTitle>
              <CardDescription className="text-elysian-white-soft">
                Completa el formulario y nos pondremos en contacto contigo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-elysian-white mb-2"
                  >
                    Nombre completo
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-elysian-background border-elysian-gold/30 text-elysian-white"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-elysian-white mb-2"
                  >
                    Correo electrónico
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-elysian-background border-elysian-gold/30 text-elysian-white"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-elysian-white mb-2"
                  >
                    Asunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-elysian-background border-elysian-gold/30 text-elysian-white"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-elysian-white mb-2"
                  >
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-elysian-background border-elysian-gold/30 text-elysian-white min-h-[120px]"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-elysian-gold hover:bg-elysian-gold/90 text-elysian-dark font-medium"
                >
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-elysian-dark border-elysian-gold/20">
              <CardHeader>
                <CardTitle className="text-elysian-white">
                  Información de contacto
                </CardTitle>
                <CardDescription className="text-elysian-white-soft">
                  Otras formas de ponerte en contacto con nosotros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-elysian-gold mt-1" />
                  <div>
                    <h3 className="text-elysian-white font-medium">
                      Correo electrónico
                    </h3>
                    <p className="text-elysian-white-soft">
                      contacto@elysianperfumes.com
                    </p>
                    <p className="text-elysian-white-soft">
                      ventas@elysianperfumes.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-elysian-gold mt-1" />
                  <div>
                    <h3 className="text-elysian-white font-medium">Teléfono</h3>
                    <p className="text-elysian-white-soft">+1 (555) 123-4567</p>
                    <p className="text-elysian-white-soft">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-elysian-gold mt-1" />
                  <div>
                    <h3 className="text-elysian-white font-medium">
                      Horarios de atención
                    </h3>
                    <p className="text-elysian-white-soft">
                      Lunes - Viernes: 9:00 AM - 6:00 PM
                      <br />
                      Sábado: 10:00 AM - 4:00 PM
                      <br />
                      Domingo: Cerrado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-elysian-dark border-elysian-gold/20">
              <CardHeader>
                <CardTitle className="text-elysian-white">
                  ¿Necesitas ayuda inmediata?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-elysian-white-soft mb-4">
                  Si tienes una consulta urgente sobre tu pedido o necesitas
                  asistencia inmediata, no dudes en llamarnos durante nuestros
                  horarios de atención.
                </p>
                <Button
                  variant="outline"
                  className="border-elysian-gold text-elysian-gold hover:bg-elysian-gold hover:text-elysian-dark"
                >
                  Llamar ahora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
