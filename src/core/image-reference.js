export function validateAndroidImageUri(uri) {
  if (typeof uri !== "string" || !uri.startsWith("content://")) {
    throw new TypeError("Android image URI must use the content:// scheme");
  }

  return uri;
}
