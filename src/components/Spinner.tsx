export const Spinner = () => (
  <div
    className="animate-spin inline-block w-20 h-20 border-[8px] border-current border-t-transparent text-pink-600 rounded-full"
    role="status"
    aria-label="loading"
  >
    <span className="sr-only">
      Loading...
    </span>
  </div>
)
