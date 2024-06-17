"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import React from "react";
import { formatDistance } from "date-fns";
import axios from "axios";
import { getExpensePurchase } from "@/lib/hooks/hook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const PurchaseTable = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PurchaseTableData />
      </QueryClientProvider>
    </>
  );
};

const PurchaseTableData = () => {
  // Todo: Implement pagination
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = getExpensePurchase();
  const result = data?.data?.data;
  const items = result?.items;

  return (
    <>
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
            items.map((item: any) => (
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
          {isLoading && (
            <TableRow>
              <TableCell className="text-center" colSpan={3}>
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default PurchaseTable;
