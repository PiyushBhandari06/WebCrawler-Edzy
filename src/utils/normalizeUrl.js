export const normalizeUrl = (rawUrl, baseUrl = null) => {
  if (!rawUrl) return null;

  // Ignore non-http links
  if (
    rawUrl.startsWith("mailto:") ||
    rawUrl.startsWith("tel:") ||
    rawUrl.startsWith("javascript:")
  ) {
    return null;
  }

  try {
    const urlObj = baseUrl
      ? new URL(rawUrl, baseUrl)
      : new URL(rawUrl);

    // Force https
    urlObj.protocol = "https:";

    // Normalize hostname
    urlObj.hostname = urlObj.hostname.toLowerCase();

    // Remove query params & hash
    urlObj.search = "";
    urlObj.hash = "";

    let pathname = urlObj.pathname;

    // Canonicalize root
    if (!pathname || pathname === "") {
      pathname = "/";
    }

    // Keep slash ONLY for root
    if (pathname === "/") {
      return `${urlObj.protocol}//${urlObj.hostname}/`;
    }

    // Remove trailing slash for non-root
    if (pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    return `${urlObj.protocol}//${urlObj.hostname}${pathname}`;
  } catch (err) {
    return null; // malformed URL
  }
};
