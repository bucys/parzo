const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export function validateFile(file: File): string | null {
  if (file.type !== 'application/pdf') {
    return 'Only PDF files are supported.';
  }
  if (file.size > MAX_SIZE_BYTES) {
    return 'File size must be under 10MB.';
  }
  return null;
}
