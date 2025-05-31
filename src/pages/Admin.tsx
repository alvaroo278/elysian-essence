import { useState, useEffect } from "react";
// import { Navigate } from 'react-router-dom';
import { Container } from "@/components/ui/container";
import { AdminPerfumeList } from "@/components/admin/PerfumeList";
// import { useAuth } from '@/contexts/AuthContext';
import { Perfume } from "@/lib/types";
import { perfumes as initialPerfumes } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminPage() {
  // const { user, isAdmin } = useAuth();
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from API
    const timer = setTimeout(() => {
      setPerfumes(initialPerfumes);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAddPerfume = (newPerfume: Omit<Perfume, "id">) => {
    // Generate a new ID (in a real app, this would be handled by the backend)
    const newId = Math.max(0, ...perfumes.map((p) => p.id)) + 1;

    const perfumeWithId = {
      ...newPerfume,
      id: newId,
    };

    setPerfumes([...perfumes, perfumeWithId]);

    toast({
      title: "Perfume añadido",
      description: `El perfume "${newPerfume.name}" ha sido añadido correctamente.`,
    });
  };

  const handleEditPerfume = (updatedPerfume: Perfume) => {
    setPerfumes(
      perfumes.map((p) => (p.id === updatedPerfume.id ? updatedPerfume : p))
    );

    toast({
      title: "Perfume actualizado",
      description: `El perfume "${updatedPerfume.name}" ha sido actualizado correctamente.`,
    });
  };

  const handleDeletePerfume = (id: number) => {
    const perfumeToDelete = perfumes.find((p) => p.id === id);

    setPerfumes(perfumes.filter((p) => p.id !== id));

    toast({
      title: "Perfume eliminado",
      description: `El perfume "${perfumeToDelete?.name}" ha sido eliminado correctamente.`,
    });
  };

  // Redirect if not logged in or not admin
  // if (!user || !isAdmin) {
  //   return <Navigate to="/login\" replace />;
  // }

  if (loading) {
    return (
      <Container className="flex justify-center items-center min-h-[60vh]">
        <div className="h-10 w-10 rounded-full border-4 border-elysian-gold/20 border-t-elysian-gold animate-spin"></div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-10">
        <h1 className="text-3xl font-bold gold-text mb-4">
          Panel de Administración
        </h1>
        <p className="text-elysian-white-soft/80">
          Gestiona los productos, usuarios y pedidos de la tienda.
        </p>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="bg-elysian-gray-dark border border-elysian-gold/20">
          <TabsTrigger
            value="products"
            className="data-[state=active]:bg-elysian-gold data-[state=active]:text-elysian-background"
          >
            Productos
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="data-[state=active]:bg-elysian-gold data-[state=active]:text-elysian-background"
          >
            Pedidos
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-elysian-gold data-[state=active]:text-elysian-background"
          >
            Usuarios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="pt-4">
          <AdminPerfumeList
            perfumes={perfumes}
            onAdd={handleAddPerfume}
            onEdit={handleEditPerfume}
            onDelete={handleDeletePerfume}
          />
        </TabsContent>

        <TabsContent value="orders" className="pt-4">
          <div className="bg-elysian-gray-dark rounded-lg p-8 border border-elysian-gold/20 text-center">
            <p className="text-elysian-white-soft/70">
              La gestión de pedidos estará disponible próximamente.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="users" className="pt-4">
          <div className="bg-elysian-gray-dark rounded-lg p-8 border border-elysian-gold/20 text-center">
            <p className="text-elysian-white-soft/70">
              La gestión de usuarios estará disponible próximamente.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
