// Extracts a YouTube video ID from either a youtu.be short link
// or a full youtube.com/watch?v=... URL. Falls back to the last
// path segment for anything else so it never throws.
export const getYoutubeId = (url) => {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }
    const v = parsed.searchParams.get("v");
    if (v) return v;
    return parsed.pathname.split("/").filter(Boolean).pop();
  } catch {
    return url.split("/").pop();
  }
};
