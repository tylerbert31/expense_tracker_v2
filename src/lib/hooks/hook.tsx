import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getExpensePurchase = (page: number = 1) => {
  return useQuery({
    queryKey: ["purchases", page],
    queryFn: () => axios.get("/api/expense", { data: { page: page } }),
  });
};
