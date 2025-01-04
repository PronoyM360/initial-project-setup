import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { useEffect } from "react";
import { FilterState } from "../app/slice/filterSlice";

const useQueryParams = <T extends Record<string, unknown>>() => {
  const filter = useAppSelector(FilterState);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(searchParams);

    Object.keys(filter).forEach((key: string) => {
      const value: unknown = filter[key];
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params.toString());
  }, [filter, searchParams, setSearchParams]);

  return filter as unknown as T;
};

export default useQueryParams;
