import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import BarChart from "./barchart";
import {
  Today,
  ThisWeek,
  ThisMonth,
  PastWeek,
  PastMonth,
  Expenses,
} from "@/lib/model/pocketbase";
import numeral from "numeral";
import { unstable_noStore as noCache } from "next/cache";
import { formatDistance } from "date-fns";
import Github from "../ui/github_svg";
import { Suspense } from "react";

export async function Expense() {
  noCache();
  // cards
  const today = await Today.getToday();
  const pastweek = await PastWeek.getToday();
  const pastmonth = await PastMonth.getToday();
  // bar graphs
  const thisWeek = await Expenses.sumThisWeek();
  const pastWeeks = await Expenses.sumPastWeeks();
  // recent purchase list
  const items: any = await Expenses.findPaginated(10, {
    sort: "-created",
    filter: "type = false",
  });
  return (
    <div className="flex flex-col h-full bg-gray-100 text-gray-900">
      <header className="bg-white p-4 shadow flex justify-between">
        <h1 className="text-2xl font-bold">🤑 Tyler's Expenses</h1>
        <Github />
      </header>
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold mb-2">Today</h2>
            <p className="text-4xl font-bold">
              ₱{" "}
              {today?.total_expenses
                ? numeral(today?.total_expenses).format("0.0a")
                : 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold mb-2">Last 7 Days</h2>
            <p className="text-4xl font-bold">
              ₱ {numeral(pastweek?.total_expenses ?? 0).format("0.00a")}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold mb-2">Last 30 Days</h2>
            <p className="text-4xl font-bold">
              ₱ {numeral(pastmonth?.total_expenses ?? 0).format("0.00a")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold mb-2">Previous 7 Days</h2>
            <BarChart expense={thisWeek} className="aspect-[16/9]" />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold mb-2">Previous 5 Weeks</h2>
            <BarChart expense={pastWeeks} className="aspect-[16/9]" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Recent</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Purchased</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items &&
                items.items.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {formatDistance(item.created, new Date(), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>₱ {item.amount}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
