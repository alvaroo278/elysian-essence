import { useState } from "react";
import { Perfume } from "@/lib/types";
import { collections } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Edit, Trash2, Plus, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PerfumeForm } from "./PerfumeForm";

interface PerfumeListProps {
  perfumes: Perfume[];
  onAdd: (perfume: Omit<Perfume, "id">) => void;
  onEdit: (perfume: Perfume) => void;
  onDelete: (id: number) => void;
}

export function AdminPerfumeList({
  perfumes,
  onAdd,
  onEdit,
  onDelete,
}: PerfumeListProps) {
  const [openDialogId, setOpenDialogId] = useState<"new" | number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const getCollectionName = (collectionId: string) => {
    const collection = collections.find((c) => c.id === collectionId);
    return collection?.name || collectionId;
  };

  const handleAdd = (perfume: Omit<Perfume, "id">) => {
    onAdd(perfume);
    setOpenDialogId(null);
  };

  const handleEdit = (perfume: Perfume) => {
    onEdit(perfume);
    setOpenDialogId(null);
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-elysian-white-soft">
          Gestión de Perfumes
        </h2>

        <Dialog
          open={openDialogId === "new"}
          onOpenChange={(open) =>
            open ? setOpenDialogId("new") : setOpenDialogId(null)
          }
        >
          <DialogTrigger asChild>
            <Button className="bg-elysian-gold hover:bg-elysian-gold-light text-elysian-background">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Perfume
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-elysian-background border-elysian-gold/20 text-elysian-white-soft max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-elysian-gold">
                Crear Nuevo Perfume
              </DialogTitle>
            </DialogHeader>
            <PerfumeForm
              onSubmit={handleAdd}
              onCancel={() => setOpenDialogId(null)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border border-elysian-gold/20 overflow-hidden">
        <Table>
          <TableHeader className="bg-elysian-gray-dark">
            <TableRow className="border-b-elysian-gold/20 hover:bg-elysian-gray-dark/80">
              <TableHead className="text-elysian-gold">Imagen</TableHead>
              <TableHead className="text-elysian-gold">Nombre</TableHead>
              <TableHead className="text-elysian-gold">Género</TableHead>
              <TableHead className="text-elysian-gold">Precio</TableHead>
              <TableHead className="text-elysian-gold">Destacado</TableHead>
              <TableHead className="text-elysian-gold text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {perfumes.map((perfume) => (
              <TableRow
                key={perfume.id}
                className="border-b-elysian-gold/10 hover:bg-elysian-gray-dark/50"
              >
                <TableCell>
                  <div className="w-12 h-12 rounded overflow-hidden">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-elysian-white-soft">
                  {perfume.name}
                  <div className="text-xs text-elysian-white-soft/70">
                    {getCollectionName(perfume.collection)}
                  </div>
                </TableCell>
                <TableCell>{perfume.gender}</TableCell>
                <TableCell className="text-elysian-gold">
                  {formatPrice(perfume.price)}
                </TableCell>
                <TableCell>
                  {perfume.featured ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Dialog
                      open={openDialogId === perfume.id}
                      onOpenChange={(open) =>
                        open
                          ? setOpenDialogId(perfume.id)
                          : setOpenDialogId(null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-elysian-gold/50 text-elysian-gold hover:bg-elysian-gold/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-elysian-background border-elysian-gold/20 text-elysian-white-soft max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-elysian-gold">
                            Editar Perfume
                          </DialogTitle>
                        </DialogHeader>
                        <PerfumeForm
                          perfume={perfume}
                          onSubmit={(updatedPerfume) =>
                            handleEdit({ ...updatedPerfume, id: perfume.id })
                          }
                          onCancel={() => setOpenDialogId(null)}
                        />
                      </DialogContent>
                    </Dialog>

                    <AlertDialog
                      open={deleteId === perfume.id}
                      onOpenChange={(open) =>
                        open ? setDeleteId(perfume.id) : setDeleteId(null)
                      }
                    >
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-elysian-background border-elysian-gold/20 text-elysian-white-soft">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-elysian-gold">
                            Confirmar Eliminación
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-elysian-white-soft/70">
                            ¿Está seguro de que desea eliminar el perfume "
                            {perfume.name}"? Esta acción no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-elysian-gold/50 text-elysian-white-soft hover:bg-elysian-gold/10">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={handleDelete}
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
