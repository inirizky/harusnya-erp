"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Loader2 } from "lucide-react";
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

const SUPPLIERS = [
  "PT Elektronik Jaya",
  "CV Komputer Makmur",
  "UD Sumber Listrik",
  "PT Network Solusi",
  "CV Kabel Nusantara",
  "PT Server Utama",
];

const PO_ITEMS = [
  "Laptop Dell Latitude 3540",
  "Monitor Samsung 24\"",
  "Keyboard Logitech K120",
  "Mouse HP Silent",
  "Cable HDMI 2m",
  "Switch TP-Link 24-port",
  "Server Rack 42U",
  "UPS APC 1500VA",
];

const STATUSES = ["Diproses", "Dikirim", "Diterima", "Tertunda"] as const;

const lineItemSchema = z.object({
  product: z.string().min(1, "Item is required"),
  quantity: z.coerce.number().int().min(1, "Min 1"),
});

const poFormSchema = z.object({
  supplier: z.string().min(1, "Supplier is required"),
  status: z.string().min(1, "Status is required"),
  items: z.array(lineItemSchema).min(1, "At least one item is required"),
});

export type POFormValues = z.infer<typeof poFormSchema>;

interface PurchaseOrderFormProps {
  onPOCreated?: (po: POFormValues & { id: string; total: string; eta: string }) => void;
  children?: React.ReactNode;
}

function fmtPrice(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function calcItemTotal(productName: string, qty: number) {
  const p = PO_ITEMS.indexOf(productName);
  const prices = [12_500_000, 3_200_000, 350_000, 180_000, 85_000, 2_800_000, 8_500_000, 4_200_000];
  return p >= 0 ? prices[p] * qty : 0;
}

export function PurchaseOrderForm({ onPOCreated, children }: PurchaseOrderFormProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<POFormValues>({
    resolver: zodResolver(poFormSchema) as any,
    defaultValues: {
      supplier: "",
      status: "Diproses",
      items: [{ product: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: "items" });
  const watchedItems = form.watch("items");

  async function onSubmit(data: POFormValues) {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));

    const total = data.items.reduce((sum, item) => sum + calcItemTotal(item.product, item.quantity), 0);
    const eta = new Date(Date.now() + 7 * 86400000).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

    const newPO = {
      ...data,
      id: `PO-2026-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`,
      total: fmtPrice(total),
      eta,
    };

    toast.success("Purchase Order created", { description: `${newPO.id} — ${newPO.supplier}, ${newPO.total}` });
    onPOCreated?.(newPO);
    setSubmitting(false);
    setOpen(false);
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New Purchase Order</SheetTitle>
          <SheetDescription>Create a new purchase order for inventory procurement.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-4 py-4">
            <FormField control={form.control} name="supplier" render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select supplier" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SUPPLIERS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium">Items</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ product: "", quantity: 1 })}>
                  <Plus className="mr-1 h-3 w-3" /> Add Item
                </Button>
              </div>

              {fields.map((item, index) => {
                const lineTotal = watchedItems[index] ? calcItemTotal(watchedItems[index].product, watchedItems[index].quantity) : 0;
                return (
                  <div key={item.id} className="rounded-lg border p-3 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-2">
                        <FormField control={form.control} name={`items.${index}.product`} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Product</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {PO_ITEMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name={`items.${index}.quantity`} render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Qty</FormLabel>
                            <FormControl><Input type="number" min={1} {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      {fields.length > 1 && (
                        <Button type="button" variant="ghost" size="icon-sm" className="mt-6 shrink-0" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    {lineTotal > 0 && (
                      <div className="text-xs text-right text-muted-foreground">
                        Line total: <span className="font-medium text-foreground">{fmtPrice(lineTotal)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="rounded-lg border bg-muted/30 p-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Total</span>
                <span>{fmtPrice(watchedItems.reduce((sum, item, i) => sum + calcItemTotal(item.product, item.quantity), 0))}</span>
              </div>
            </div>

            <SheetFooter className="px-0">
              <SheetClose asChild><Button type="button" variant="outline">Cancel</Button></SheetClose>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitting ? "Creating..." : "Create PO"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
