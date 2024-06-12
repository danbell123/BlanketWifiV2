import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ThemeToggle from "../../components/ThemeToggle"; // Adjust the path as necessary

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2 light p-4 bg-background border">
              <h2 className="text-xl font-bold">Light Theme Colors</h2>
              <div className="bg-background p-4 shadow rounded-lg">
                <h3 className="font-semibold text-foreground">Background</h3>
              </div>
              <div className="bg-card p-4 shadow rounded-lg">
                <h3 className="font-semibold text-card-foreground">Card</h3>
              </div>
              <div className="bg-popover p-4 shadow rounded-lg">
                <h3 className="font-semibold text-popover-foreground">
                  Popover
                </h3>
              </div>
              <div className="bg-primary p-4 shadow rounded-lg text-primary-foreground">
                Primary
              </div>
              <div className="bg-secondary p-4 shadow rounded-lg text-secondary-foreground">
                Secondary
              </div>
              <div className="bg-accent p-4 shadow rounded-lg text-accent-foreground">
                Accent
              </div>
              <div className="bg-destructive p-4 shadow rounded-lg text-destructive-foreground">
                Destructive
              </div>
              <div className="bg-card p-4 shadow rounded-lg">
                <Button variant={"outline"}>Test</Button>
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
        <Button>Test</Button>
        <ThemeToggle />
      </footer>
    </div>
  );
}
