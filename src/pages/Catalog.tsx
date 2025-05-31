import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { PerfumeList } from '@/components/product/PerfumeList';
import { Perfume } from '@/lib/types';
import { perfumes as mockPerfumes } from '@/lib/mockData';

export function CatalogPage() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from API
    const timer = setTimeout(() => {
      setPerfumes(mockPerfumes);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gold-text">
            Catálogo de Perfumes
          </h1>
          <p className="text-elysian-white-soft/80 max-w-2xl mx-auto">
            Descubre nuestra colección exclusiva de fragancias creadas con los ingredientes más selectos.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="h-10 w-10 rounded-full border-4 border-elysian-gold/20 border-t-elysian-gold animate-spin"></div>
          </div>
        ) : (
          <PerfumeList perfumes={perfumes} />
        )}
      </Container>
    </main>
  );
}