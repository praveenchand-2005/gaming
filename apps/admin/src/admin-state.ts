export interface ResourceState<T> { data: T[]; loading: boolean; error: string | null; }

export const emptyResource = <T>(): ResourceState<T> => ({ data: [], loading: false, error: null });

export function appendResource<T>(state: ResourceState<T>, value: T): ResourceState<T> {
  return { ...state, data: [value, ...state.data], error: null };
}
