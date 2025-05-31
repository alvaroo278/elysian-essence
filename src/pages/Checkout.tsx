import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PaymentMethods } from "@/components/checkout/PaymentMethods";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [activeStep, setActiveStep] = useState<"shipping" | "payment">(
    "shipping"
  );

  const shippingCost = totalPrice > 100 ? 0 : 5.99;
  const total = totalPrice + shippingCost;

  const handleContinueToPayment = () => {
    setActiveStep("payment");
  };

  const handleBackToShipping = () => {
    setActiveStep("shipping");
  };

  return (
    <Container>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 gold-text">
          Finalizar Compra
        </h1>
        <p className="text-elysian-white-soft/80 max-w-2xl mx-auto">
          Complete sus datos de envío y pago para finalizar su pedido.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-elysian-gray-dark rounded-lg p-6 border border-elysian-gold/20">
            {activeStep === "shipping" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-elysian-white-soft mb-6">
                  Información de Envío
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleContinueToPayment();
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-elysian-white-soft"
                      >
                        Nombre
                      </Label>
                      <Input
                        id="firstName"
                        className="bg-elysian-background border-elysian-gold/20 focus:border-elysian-gold"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-elysian-white-soft"
                      >
                        Apellidos
                      </Label>
                      <Input
                        id="lastName"
                        className="bg-elysian-background border-elysian-gold/20 focus:border-elysian-gold"
                        placeholder="Tus apellidos"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-elysian-white-soft">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="bg-elysian-background border-elysian-gold/20 focus:border-elysian-gold"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-elysian-white-soft"
                    >
                      Dirección
                    </Label>
                    <Input
                      id="address"
                      className="bg-elysian-background border-elysian-gold/20 focus:border-elysian-gold"
                      placeholder="Calle, número, piso..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="postalCode"
                        className="text-elysian-white-soft"
                      >
                        Código Postal
                      </Label>
                      <Input
                        id="postalCode"
                        className="bg-elysian-background border-elysian-gold/20 focus:border-elysian-gold"
                        placeholder="28001"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="city" className="text-elysian-white-soft">
                        Ciudad
                      </Label>
                      <Input
                        id="city"
                        className="bg-elysian-background border-elysian-gold/20 focus:border-elysian-gold"
                        placeholder="Madrid"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-elysian-white-soft">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      className="bg-elysian-background border-elysian-gold/20 focus:border-elysian-gold"
                      placeholder="+34 600 000 000"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-elysian-white-soft">
                      Notas del pedido (opcional)
                    </Label>
                    <Textarea
                      id="notes"
                      className="bg-elysian-background border-elysian-gold/20 focus:border-elysian-gold"
                      placeholder="Instrucciones especiales para la entrega..."
                      rows={3}
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-elysian-gold hover:bg-elysian-gold-light text-elysian-background"
                    >
                      Continuar al Pago
                    </Button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-elysian-white-soft">
                    Método de Pago
                  </h2>
                  <Button
                    variant="ghost"
                    className="text-elysian-gold hover:text-elysian-gold-light hover:bg-transparent"
                    onClick={handleBackToShipping}
                  >
                    Volver a Envío
                  </Button>
                </div>

                <PaymentMethods />
              </motion.div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-elysian-gray-dark rounded-lg p-6 border border-elysian-gold/20 sticky top-24">
            <h3 className="text-xl font-semibold text-elysian-white-soft mb-4">
              Resumen del Pedido
            </h3>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.perfume.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.perfume.image}
                      alt={item.perfume.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-elysian-white-soft">
                      {item.perfume.name}
                    </h4>
                    <p className="text-xs text-elysian-white-soft/70">
                      {item.quantity} x {formatPrice(item.perfume.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-elysian-gold">
                      {formatPrice(item.perfume.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="bg-elysian-gold/20 my-4" />

            <div className="space-y-3">
              <div className="flex justify-between text-elysian-white-soft/80">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              <div className="flex justify-between text-elysian-white-soft/80">
                <span>Envío</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-500">Gratis</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>

              <Separator className="bg-elysian-gold/20 my-2" />

              <div className="flex justify-between font-semibold">
                <span className="text-elysian-white-soft">Total</span>
                <span className="text-elysian-gold">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="text-xs text-elysian-white-soft/70 mt-4">
              Al realizar el pedido, aceptas nuestros{" "}
              <Link
                to="/terminos"
                className="text-elysian-gold hover:underline"
              >
                Términos y Condiciones
              </Link>{" "}
              y nuestra{" "}
              <Link
                to="/privacidad"
                className="text-elysian-gold hover:underline"
              >
                Política de Privacidad
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
