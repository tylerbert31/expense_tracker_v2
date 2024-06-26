import Github from "../ui/github_svg";
import { Suspense } from "react";
import {
  TodayCard,
  Last7DaysCard,
  Last30DaysCard,
  CardTemplateLoader,
} from "./minified/card";
import {
  Prev30Days,
  Prev7Days,
  BarGraphTemplateLoader,
} from "./minified/bargraph";
import PurchaseTable from "./minified/table";

export async function Expense() {
  return (
    <div className="flex flex-col h-full bg-gray-100 text-gray-900">
      <header className="bg-white p-4 shadow flex justify-between">
        <h1 className="text-2xl font-bold">🤑 Tyler's Expenses</h1>
        <Github />
      </header>
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Suspense fallback={<CardTemplateLoader />}>
            <TodayCard />
          </Suspense>
          <Suspense fallback={<CardTemplateLoader />}>
            <Last7DaysCard />
          </Suspense>
          <Suspense fallback={<CardTemplateLoader />}>
            <Last30DaysCard />
          </Suspense>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Suspense fallback={<BarGraphTemplateLoader />}>
            <Prev7Days />
          </Suspense>
          <Suspense fallback={<BarGraphTemplateLoader />}>
            <Prev30Days />
          </Suspense>
        </div>
        <div className="bg-white rounded-lg shadow p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Recent</h2>
          <PurchaseTable />
        </div>
      </main>
    </div>
  );
}
