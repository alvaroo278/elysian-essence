import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, PiggyBank, CircleDollarSign } from 'lucide-react';

const methods = [
  {
    id: 'redsys',
    name: 'Tarjeta de crédito/débito',
    icon: <CreditCard className="h-5 w-5 text-elysian-gold" />,
    description: 'Pago seguro con Redsys',
  },
  {
    id: 'bizum',
    name: 'Bizum',
    icon: <PiggyBank className="h-5 w-5 text-elysian-gold" />,
    description: 'Pago rápido con tu móvil',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <CircleDollarSign className="h-5 w-5 text-elysian-gold" />,
    description: 'Pago seguro con tu cuenta PayPal',
  },
  {
    id: 'applepay',
    name: 'Apple Pay',
    icon: <Banknote className="h-5 w-5 text-elysian-gold" />,
    description: 'Pago rápido y seguro',
  },
];

export function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState('redsys');

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-elysian-white-soft">Método de pago</h3>
      
      <RadioGroup 
        value={paymentMethod} 
        onValueChange={setPaymentMethod}
        className="space-y-3"
      >
        {methods.map((method) => (
          <motion.div 
            key={method.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all ${
              paymentMethod === method.id 
                ? 'border-elysian-gold bg-elysian-gold/5' 
                : 'border-elysian-gold/20 hover:border-elysian-gold/50'
            }`}
            onClick={() => setPaymentMethod(method.id)}
          >
            <RadioGroupItem 
              value={method.id} 
              id={method.id}
              className="border-elysian-gold text-elysian-gold"
            />
            <div className="flex flex-1 items-center">
              <div className="mr-3">
                {method.icon}
              </div>
              <div>
                <Label 
                  htmlFor={method.id}
                  className="text-base font-medium text-elysian-white-soft cursor-pointer"
                >
                  {method.name}
                </Label>
                <p className="text-sm text-elysian-white-soft/70">
                  {method.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </RadioGroup>
      
      <Button className="w-full mt-8 bg-elysian-gold hover:bg-elysian-gold-light text-elysian-background">
        Realizar pago
      </Button>
    </div>
  );
}