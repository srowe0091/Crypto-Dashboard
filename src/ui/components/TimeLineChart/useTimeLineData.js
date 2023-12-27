import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/constants";

export const useTimeLineData = (ticker) => {
  const { data, isLoading } = useQuery({
    queryKey: [ticker],
    queryFn: async () => {
      try {
        const url = new URL(API_URL + "/v2/histohour");
        url.searchParams.append("fsym", ticker);
        url.searchParams.append("tsym", "USD");
        url.searchParams.append("limit", "24");

        const data = await fetch(url);

        if (data.ok) {
          const { Data, Response } = await data.json();

          if (Response === "Success") {
            return Data.Data;
          }
        }

        return [];
      } catch (err) {
        return [];
      }
    },
  });

  return { data, isLoading };
};
