export function useQuery() {
  return new URLSearchParams(location.search);
}
