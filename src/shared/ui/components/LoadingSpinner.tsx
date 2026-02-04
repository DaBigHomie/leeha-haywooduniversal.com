export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16" role="status" aria-label="Loading content">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
