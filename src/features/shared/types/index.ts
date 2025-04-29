import { AxiosError } from "axios";

export interface CollectionData<T> {
  data: T[];
  total: number;
  userTotal?: number;
}

export type RequestAxiosError = AxiosError<{ message: string }>;
