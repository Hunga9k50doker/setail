function useSearchParam(paramName) {
  const searchParams = new URLSearchParams(window.location.search);
  const value = searchParams.get(paramName);
  return value;
}

export default useSearchParam;
