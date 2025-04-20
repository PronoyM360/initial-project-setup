import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  addRestFilter,
  FilterState,
  resetSpecificFilter,
} from "../app/slice/filterSlice";
import { useAppDispatch, useAppSelector } from "../app/store";

export type DefaultFilterTypes = {
  limit: number;
  skip: number;
  key?: string;
};

const useQueryParams = <
  T extends Partial<Record<string, string | number | boolean>>
>(
  record?: T
) => {
  const filter = useAppSelector(FilterState);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!record) return;
    const params = new URLSearchParams(searchParams);
    Object.entries(record).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        dispatch(addRestFilter({ label: key, value }));
        params.set(key, value.toString());
      } else {
        dispatch(resetSpecificFilter({ label: key }));
        params.delete(key);
      }
    });

    setSearchParams(params.toString());
  }, [record, searchParams, dispatch, setSearchParams]);

  const memoizedFilter = useMemo(() => filter as unknown as T, [filter]);

  return memoizedFilter;
};

export default useQueryParams;
