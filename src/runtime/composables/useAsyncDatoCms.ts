import type { UseDatoCmsParams } from '../types';
import { useDatoQuery } from './shared/useDatoQuery';
import type { AsyncDataOptions } from '#app';

export async function useAsyncDatoCms({ query, variables = {}, subscribe = true }: UseDatoCmsParams, uniqueKey?: string, useAsyncOptions: AsyncDataOptions<any> = {}) {
  return useDatoQuery({ query, variables, subscribe }, true, uniqueKey, useAsyncOptions);
}
