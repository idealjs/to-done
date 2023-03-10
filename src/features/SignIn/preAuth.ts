const preAuth = async (
  email: string | undefined
): Promise<{
  allow: boolean;
}> => {
  if (email == null) {
    return { allow: false };
  }

  const url = new URL("/api/v1/preAuth", window.location.origin);
  const searchParams = new URLSearchParams({ email });
  url.search = searchParams.toString();
  return (
    await fetch(url, {
      method: "GET",
    })
  ).json();
};

export default preAuth;
