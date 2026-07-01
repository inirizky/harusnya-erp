"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ─── Categories ─── */
const CATEGORIES = ["Elektronik", "Jaringan", "Server", "Aksesoris", "Penyimpanan"] as const;

/* ─── Warehouses ─── */
const WAREHOUSES = ["Gudang Utama", "Gudang 2", "Gudang 3"] as const;

/* ─── Zod schema ─── */
const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  minStock: z.coerce.number().int().min(0, "Min stock cannot be negative"),
  warehouse: z.string().min(1, "Warehouse is required"),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

/* ─── Helpers ─── */
function generateSKU(name: string): string {
  const prefix = name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase())
    .slice(0, 3)
    .join("");
  const suffix = String(Math.floor(Math.random() * 900) + 100);
  return `${prefix}-${suffix}`;
}

/* ─── Props ─── */
interface ProductFormProps {
  onProductCreated?: (product: ProductFormValues & { status: string }) => void;
  children?: React.ReactNode;
}

/* ─── Component ─── */
export function ProductForm({ onProductCreated, children }: ProductFormProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as any,
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      stock: 0,
      minStock: 0,
      warehouse: "",
    },
  });

  /* ─── Auto-generate SKU when name changes ─── */
  function handleNameBlur() {
    const name = form.getValues("name");
    const currentSKU = form.getValues("sku");
    if (name && !currentSKU) {
      form.setValue("sku", generateSKU(name));
    }
  }

  /* ─── Submit ─── */
  async function onSubmit(data: ProductFormValues) {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const status =
      data.stock === 0
        ? "Kritis"
        : data.stock <= data.minStock
          ? "Menipis"
          : "Aman";

    toast.success("Product added", {
      description: `${data.name} (${data.sku}) — ${data.stock} units in ${data.warehouse}`,
    });

    onProductCreated?.({ ...data, status });
    setSubmitting(false);
    setOpen(false);
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Product</SheetTitle>
          <SheetDescription>Fill in the details to add a new product to inventory.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-4 py-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Laptop Dell XPS 13" {...field} onBlur={handleNameBlur} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SKU */}
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="Auto-generated from name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock + Min Stock side by side */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Stock</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Warehouse */}
            <FormField
              control={form.control}
              name="warehouse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warehouse</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {WAREHOUSES.map((w) => (
                        <SelectItem key={w} value={w}>
                          {w}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <SheetFooter className="px-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitting ? "Adding..." : "Add Product"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
