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

/* ─── Customers list ─── */
const CUSTOMERS = [
  "PT Maju Jaya",
  "CV Sukses Abadi",
  "UD Berkah Utama",
  "PT Indo Makmur Sentosa",
  "CV Bintang Terang",
  "PT Sinar Jaya Abadi",
  "CV Karya Mandiri",
  "UD Sumber Rejeki",
];

/* ─── Products list ─── */
const PRODUCTS = [
  { name: "Laptop ThinkPad X1", price: 15_000_000 },
  { name: "Monitor Dell 27\"", price: 3_500_000 },
  { name: "Keyboard Mechanical", price: 850_000 },
  { name: "Mouse Wireless", price: 250_000 },
  { name: "Webcam HD Pro", price: 750_000 },
  { name: "Headset Bluetooth", price: 450_000 },
  { name: "USB-C Hub", price: 350_000 },
  { name: "External SSD 1TB", price: 1_200_000 },
];

/* ─── Zod schema ─── */
const lineItemSchema = z.object({
  product: z.string().min(1, "Product is required"),
  quantity: z.coerce.number().int().min(1, "Min 1 item"),
});

const invoiceFormSchema = z.object({
  customer: z.string().min(1, "Customer is required"),
  date: z.string().min(1, "Date is required"),
  items: z.array(lineItemSchema).min(1, "At least one item is required"),
});

export type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

/* ─── Props ─── */
interface InvoiceFormProps {
  /** Called after a successful submit. Receives the new invoice data. */
  onInvoiceCreated?: (invoice: InvoiceFormValues & { id: string; amount: string; status: string; payment: string }) => void;
  children?: React.ReactNode;
}

/* ─── Helpers ─── */
function fmtPrice(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function calcItemTotal(productName: string, qty: number) {
  const p = PRODUCTS.find((p) => p.name === productName);
  return p ? p.price * qty : 0;
}

/* ─── Component ─── */
export function InvoiceForm({ onInvoiceCreated, children }: InvoiceFormProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema) as any,
    defaultValues: {
      customer: "",
      date: new Date().toISOString().slice(0, 10),
      items: [{ product: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: "items" });

  const watchedItems = form.watch("items");

  /* ─── Submit ─── */
  async function onSubmit(data: InvoiceFormValues) {
    setSubmitting(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const total = data.items.reduce((sum, item) => sum + calcItemTotal(item.product, item.quantity), 0);

    const newInvoice = {
      ...data,
      id: `INV-2026-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`,
      date: new Date(data.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
      amount: fmtPrice(total),
      status: "Diproses",
      payment: "Transfer",
    };

    toast.success("Invoice created", {
      description: `${newInvoice.id} for ${newInvoice.customer} — ${newInvoice.amount}`,
    });

    onInvoiceCreated?.(newInvoice);
    setSubmitting(false);
    setOpen(false);
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New Invoice</SheetTitle>
          <SheetDescription>Fill in the details to create a new invoice.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4 py-4">
            {/* Customer */}
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CUSTOMERS.map((c) => (
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

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Line items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium">Items</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ product: "", quantity: 1 })}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add Item
                </Button>
              </div>

              {fields.map((item, index) => {
                const selectedProduct = PRODUCTS.find((p) => p.name === watchedItems[index]?.product);
                const lineTotal = watchedItems[index]
                  ? calcItemTotal(watchedItems[index].product, watchedItems[index].quantity)
                  : 0;

                return (
                  <div key={item.id} className="rounded-lg border p-3 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-2">
                        {/* Product select */}
                        <FormField
                          control={form.control}
                          name={`items.${index}.product`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Product</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select product" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {PRODUCTS.map((p) => (
                                    <SelectItem key={p.name} value={p.name}>
                                      {p.name} — {fmtPrice(p.price)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Quantity */}
                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Qty</FormLabel>
                              <FormControl>
                                <Input type="number" min={1} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Remove button */}
                      {fields.length > 1 && (
                        <Button type="button" variant="ghost" size="icon-sm" className="mt-6 shrink-0" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>

                    {/* Line total */}
                    {selectedProduct && (
                      <div className="text-xs text-right text-muted-foreground">
                        {selectedProduct.name} × {watchedItems[index]?.quantity ?? 0} ={" "}
                        <span className="font-medium text-foreground">{fmtPrice(lineTotal)}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Items-level error */}
              {form.formState.errors.items?.root && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  {form.formState.errors.items.root.message}
                </p>
              )}
            </div>

            {/* Grand total */}
            <div className="rounded-lg border bg-muted/30 p-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Total</span>
                <span>
                  {fmtPrice(
                    watchedItems.reduce(
                      (sum, item, i) => sum + calcItemTotal(item.product, item.quantity),
                      0
                    )
                  )}
                </span>
              </div>
            </div>

            {/* Footer */}
            <SheetFooter className="px-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitting ? "Creating..." : "Create Invoice"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
