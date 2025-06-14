import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Perfume, CollectionId } from "@/lib/types";
import { collections } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

interface PerfumeFormProps {
  perfume?: Perfume;
  onSubmit: (perfume: Omit<Perfume, "id"> & { id?: number }) => void;
  onCancel: () => void;
}

export function PerfumeForm({ perfume, onSubmit, onCancel }: PerfumeFormProps) {
  const [formData, setFormData] = useState<
    Omit<Perfume, "id"> & { id?: number }
  >({
    id: perfume?.id,
    name: perfume?.name || "",
    collection: perfume?.collection || "lattafa",
    description: perfume?.description || "",
    price: perfume?.price || 0,
    image: perfume?.image || "",
    gender: perfume?.gender || "Hombre",
    featured: perfume?.featured || false,
    notes: perfume?.notes || [],
  });

  const [notesInput, setNotesInput] = useState(
    perfume?.notes?.join(", ") || ""
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      featured: checked,
    });
  };

  const handleGenderChange = (value: string) => {
    setFormData({
      ...formData,
      gender: value as "Hombre" | "Mujer" | "Unisex",
    });
  };

  const handleCollectionChange = (value: string) => {
    setFormData({
      ...formData,
      collection: value as CollectionId,
    });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotesInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.collection ||
      !formData.description ||
      !formData.image ||
      formData.price <= 0
    ) {
      toast({
        title: "Error",
        description: "Por favor, complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // Parse notes from comma-separated string
    const notes = notesInput
      .split(",")
      .map((note) => note.trim())
      .filter((note) => note);

    onSubmit({
      ...formData,
      notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-elysian-white-soft">
            Nombre
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-elysian-gray-dark border-elysian-gold/20 focus:border-elysian-gold"
            placeholder="Nombre del perfume"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="collection" className="text-elysian-white-soft">
            Colección
          </Label>
          <Select
            value={formData.collection}
            onValueChange={handleCollectionChange}
          >
            <SelectTrigger className="bg-elysian-gray-dark border-elysian-gold/20 focus:border-elysian-gold">
              <SelectValue placeholder="Seleccionar colección" />
            </SelectTrigger>
            <SelectContent className="bg-elysian-gray-dark border-elysian-gold/20">
              {collections.map((collection) => (
                <SelectItem
                  key={collection.id}
                  value={collection.id}
                  className="focus:bg-elysian-gold/10"
                >
                  {collection.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-elysian-white-soft">
          Descripción
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="bg-elysian-gray-dark border-elysian-gold/20 focus:border-elysian-gold"
          placeholder="Descripción del perfume"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-elysian-white-soft">
            Precio (€)
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            className="bg-elysian-gray-dark border-elysian-gold/20 focus:border-elysian-gold"
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-elysian-white-soft">
            Género
          </Label>
          <Select value={formData.gender} onValueChange={handleGenderChange}>
            <SelectTrigger className="bg-elysian-gray-dark border-elysian-gold/20 focus:border-elysian-gold">
              <SelectValue placeholder="Seleccionar género" />
            </SelectTrigger>
            <SelectContent className="bg-elysian-gray-dark border-elysian-gold/20">
              <SelectItem value="Hombre" className="focus:bg-elysian-gold/10">
                Hombre
              </SelectItem>
              <SelectItem value="Mujer" className="focus:bg-elysian-gold/10">
                Mujer
              </SelectItem>
              <SelectItem value="Unisex" className="focus:bg-elysian-gold/10">
                Unisex
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image" className="text-elysian-white-soft">
          URL de la imagen
        </Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="bg-elysian-gray-dark border-elysian-gold/20 focus:border-elysian-gold"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-elysian-white-soft">
          Notas (separadas por comas)
        </Label>
        <Input
          id="notes"
          name="notes"
          value={notesInput}
          onChange={handleNotesChange}
          className="bg-elysian-gray-dark border-elysian-gold/20 focus:border-elysian-gold"
          placeholder="Vainilla, Pachulí, Ámbar"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={handleSwitchChange}
          className="data-[state=checked]:bg-elysian-gold"
        />
        <Label htmlFor="featured" className="text-elysian-white-soft">
          Destacado
        </Label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-elysian-gold/50 text-elysian-gold hover:bg-elysian-gold/10"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-elysian-gold hover:bg-elysian-gold-light text-elysian-background"
        >
          {perfume ? "Actualizar" : "Crear"} Perfume
        </Button>
      </div>
    </form>
  );
}
