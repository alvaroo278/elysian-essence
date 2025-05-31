import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login for admin
    if (email === 'admin@elysian.com' && password === 'admin') {
      login({
        id: '1',
        name: 'Admin',
        email: 'admin@elysian.com',
        isAdmin: true,
      });
      
      toast({
        title: 'Sesión iniciada',
        description: 'Has iniciado sesión como administrador.',
      });
      
      navigate('/admin');
      return;
    }
    
    // Demo login for regular user
    if (email && password) {
      login({
        id: '2',
        name: 'Usuario',
        email: email,
        isAdmin: false,
      });
      
      toast({
        title: 'Sesión iniciada',
        description: 'Has iniciado sesión correctamente.',
      });
      
      navigate('/');
      return;
    }
    
    toast({
      title: 'Error',
      description: 'Por favor, introduce un email y contraseña válidos.',
      variant: 'destructive',
    });
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    login({
      id: '3',
      name: 'Usuario Google',
      email: 'usuario@gmail.com',
      photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
      isAdmin: false,
    });
    
    toast({
      title: 'Sesión iniciada',
      description: 'Has iniciado sesión con Google correctamente.',
    });
    
    navigate('/');
  };

  return (
    <Container className="flex justify-center items-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-elysian-gray-dark rounded-lg p-8 border border-elysian-gold/20">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold gold-text mb-2">Iniciar Sesión</h1>
            <p className="text-elysian-white-soft/70">
              Accede a tu cuenta para gestionar tus pedidos y favoritos
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-elysian-white-soft">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-elysian-background border-elysian-gold/20 focus:border-elysian-gold" 
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-elysian-white-soft">Contraseña</Label>
                <Link to="/recuperar-password" className="text-xs text-elysian-gold hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-elysian-background border-elysian-gold/20 focus:border-elysian-gold" 
                placeholder="********"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-elysian-gold hover:bg-elysian-gold-light text-elysian-background"
            >
              Iniciar Sesión
            </Button>
          </form>
          
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-elysian-gold/20"></div>
            <div className="px-4 text-elysian-white-soft/50 text-sm">O</div>
            <div className="flex-1 border-t border-elysian-gold/20"></div>
          </div>
          
          <Button 
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full border-elysian-gold/50 text-elysian-white-soft hover:bg-elysian-gold/10"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064 5.963 5.963 0 014.123 1.632l2.928-2.827A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"
              />
            </svg>
            Continuar con Google
          </Button>
          
          <div className="text-center mt-8 text-sm text-elysian-white-soft/70">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="text-elysian-gold hover:underline">
              Regístrate
            </Link>
          </div>
          
          <div className="text-center mt-4 text-xs text-elysian-white-soft/50">
            <p>
              Para probar la cuenta de administrador, usa:<br />
              Email: admin@elysian.com<br />
              Contraseña: admin
            </p>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}