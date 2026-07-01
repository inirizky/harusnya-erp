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

const CATEGORIES = [
  "Server", "Vehicle", "Office Equipment", "Network",
  "Heavy Equipment", "Electronics", "Building", "Electrical",
  "Furniture", "Software",
];

const STATUSES = ["Active", "Maintenance", "Disposed"] as const;

const LOCATIONS = [
  "Data Center", "Parking", "Floor 2", "Server Room",
  "Warehouse", "IT Dept", "Floor 1", "Marketing", "-",
];

const assetFormSchema = z.object({
  name: z.string().min(1, "Asset name is required"),
  category: z.string().min(1, "Category is required"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
  purchaseValue: z.coerce.number().positive("Purchase value must be positive"),
  depreciationRate: z.coerce.number().min(0, "Min 0%").max(100, "Max 100%"),
  location: z.string().min(1, "Location is required"),
  status: z.string().min(1, "Status is required"),
});

export type AssetFormValues = z.infer<typeof assetFormSchema>;

interface AssetFormProps {
  onAssetCreated?: (asset: AssetFormValues & { id: string; currentValue: string; depreciation: string }) => void;
  children?: React.ReactNode;
}

function fmt(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function AssetForm({ onAssetCreated, children }: AssetFormProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema) as any,
    defaultValues: {
      name: "",
      category: "",
      purchaseDate: new Date().toISOString().slice(0, 10),
      purchaseValue: 0,
      depreciationRate: 10,
      location: "",
      status: "Active",
    },
  });

  const watchValue = form.watch("purchaseValue");
  const watchDepr = form.watch("depreciationRate");
  const currentValue = Number(watchValue) * (1 - Number(watchDepr) / 100);

  async function onSubmit(data: AssetFormValues) {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const id = `AST-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`;
    const deprFormatted = `${data.depreciationRate}%`;

    toast.success("Asset added", {
      description: `${data.name} — ${fmt(data.purchaseValue)}`,
    });

    onAssetCreated?.({
      ...data,
      id,
      currentValue: fmt(Math.round(currentValue)),
      depreciation: deprFormatted,
    });
    setSubmitting(false);
    setOpen(false);
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Asset</SheetTitle>
          <SheetDescription>Register a new company asset with depreciation tracking.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-4 py-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Asset Name</FormLabel>
                <FormControl><Input placeholder="e.g. Dell PowerEdge R740" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="purchaseDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Date</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="purchaseValue" render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Value (Rp)</FormLabel>
                  <FormControl><Input type="number" min={0} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="depreciationRate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Depreciation Rate (%)</FormLabel>
                  <FormControl><Input type="number" min={0} max={100} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Preview current value */}
            {Number(watchValue) > 0 && (
              <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current value (after depreciation)</span>
                  <span className="font-medium">{fmt(Math.round(currentValue))}</span>
                </div>
              </div>
            )}

            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {LOCATIONS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <SheetFooter className="px-0">
              <SheetClose asChild><Button type="button" variant="outline">Cancel</Button></SheetClose>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitting ? "Adding..." : "Add Asset"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
