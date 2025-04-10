"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner";
import { error } from "console";

// Sample crypto data - replace with your actual data source
const cryptos = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Ethereum", value: "ETH" },
  { label: "Binance Coin", value: "BNB" },
  { label: "Cardano", value: "ADA" },
  { label: "Solana", value: "SOL" },
  { label: "XRP", value: "XRP" },
  { label: "Polkadot", value: "DOT" },
  { label: "Dogecoin", value: "DOGE" },
]

// form validation schemes
const formSchema = z.object({
  crypto: z.string({
    required_error: "Please select a cryptocurrency.",
  }),
  quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Quantity must be a positive number.",
  }),
  useCurrentPrice: z.boolean().default(true),
  price: z.string().optional(),
  transactionType: z.enum(["buy", "sell"], {
    required_error: "Please select a transaction type.",
  }),
})

const baseURL = process.env.NEXT_PUBLIC_DOTNET_API_BASE_URL;

export function AddTransactionModal() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "",
      quantity: "",
      useCurrentPrice: true,
      transactionType: "buy",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Retrieve session ID from local storage
    const sessionId = localStorage.getItem("sessionId");

    // create http headers
    const headers = {
      "Content-Type": "application/json",
      ...(sessionId && { "X-Session-ID": sessionId }) // Only add if sessionId exists
    };

    await toast.promise(
      (async () => {
        const payload = {
          ...values,
          quantity: parseFloat(values.quantity),
          price: values.price ? parseFloat(values.price) : undefined,
        };

        const res = await fetch(`${baseURL}/api/transactions/add`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: headers,
        });

        // parse response
        const result = await res.json();

        // if bad response, throw error
        if (!res.ok) {
          throw new Error(result.message);
        }

        // Only close modal & reset on success
        setOpen(false);
        form.reset();

        console.log(result);

        return result;
      })(),
      {
        loading: "Submitting transaction...",
        success: (data) => {
          if (data.success) {
            return "Transaction Added Successfully";
          }
          throw new Error(data.message);
        },
        error: (error) => {
          return error.message;
        },
      }
    );

    // async fn to call endpoint
    // const submitTransaction = async (formData: z.infer<typeof formSchema>) => {

    //   // parse as decimal/float before sending
    //   const payload = {
    //     ...formData,
    //     quantity: parseFloat(formData.quantity),
    //     price: formData.price ? parseFloat(formData.price) : undefined,
    //   };

    //   // post request
    //   const res = await fetch("https://localhost:7166/api/transactions/add", {
    //     method: "POST",
    //     body: JSON.stringify(payload),
    //     headers: headers,
    //   });

    //   if (!res.ok) throw new Error("Failed to submit transaction");

    //   return await res.json(); // or text if needed
    // };

    // await toast.promise(submitTransaction(values), {
    //   loading: "Submitting transaction...",
    //   success: () => {
    //     setTimeout(() => {
    //       setOpen(false);
    //       form.reset();
    //     }, 3000); // 300–500ms is usually enough
    //     return "Transaction Added Successfully";
    //   },
    //   error: "Failed to add transaction.",
    // });


    // Delay closing modal to allow toast to show
    // setTimeout(() => {
    // setOpen(false);
    // form.reset();
    // }, 3000); // 300–500ms is usually enough
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Floating Btn here */}
      <div className="relative group">
        <button
          className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-14 h-14 bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white rounded-full shadow-lg transition duration-300 animate-float"
          title="Add Transaction"
          onClick={() => setOpen(true)}
        >
          <Plus size={24} />
        </button>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Enter the details of your crypto transaction.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="crypto"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Cryptocurrency</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn("justify-between", !field.value && "text-muted-foreground")}
                        >
                          {field.value
                            ? cryptos.find((crypto) => crypto.value === field.value)?.label
                            : "Select cryptocurrency"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search cryptocurrency..." />
                        <CommandList>
                          <CommandEmpty>No cryptocurrency found.</CommandEmpty>
                          <CommandGroup>
                            {cryptos.map((crypto) => (
                              <CommandItem
                                key={crypto.value}
                                value={crypto.value}
                                onSelect={() => {
                                  form.setValue("crypto", crypto.value)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    crypto.value === field.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {crypto.label} ({crypto.value})
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="0.00" type="number" step="any" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="useCurrentPrice"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Use Current Price</FormLabel>
                    <FormDescription>Toggle to use current market price or enter a custom price</FormDescription>
                  </div>
                  <FormControl>
                    <Switch className="cursor-pointer" checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {!form.watch("useCurrentPrice") && (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Price (USD)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" type="number" step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-1">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="cursor-pointer" value="buy" />
                        </FormControl>
                        <FormLabel className="font-normal">Buy</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem className="cursor-pointer" value="sell" />
                        </FormControl>
                        <FormLabel className="font-normal">Sell</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button className="cursor-pointer" type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button className="cursor-pointer" type="submit">Add Transaction</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

