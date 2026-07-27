const ENGLISH_TEXT = /^[\x20-\x7E]+$/;
const ENGLISH_KEYWORD = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

export function validateVisionMetadata(value) {
  if (!value || typeof value !== "object") {
    throw new TypeError("Vision metadata must be an object");
  }

  const { description, keywords } = value;

  if (
    typeof description !== "string" ||
    description.length === 0 ||
    description.length >= 2000 ||
    !ENGLISH_TEXT.test(description)
  ) {
    throw new TypeError(
      "Description must be non-empty English text under 2000 characters",
    );
  }

  if (
    !Array.isArray(keywords) ||
    keywords.length !== 7 ||
    keywords.some(
      (keyword) =>
        typeof keyword !== "string" || !ENGLISH_KEYWORD.test(keyword),
    )
  ) {
    throw new TypeError("Keywords must contain exactly 7 English keywords");
  }

  return {
    description,
    keywords: [...keywords],
  };
}
