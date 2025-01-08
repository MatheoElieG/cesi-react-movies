export const MovieCardSkeleton = () => {
  return (
    <div className="bg-white rounded-md shadow overflow-hidden scale-[0.97] hover:scale-100 transition-transform transform-gpu">
      <div className="overflow-hidden aspect-[2/3] flex items-stretch justify-stretch">
        <div className="animate-pulse flex items-center justify-center w-full h-full bg-gray-300 rounded">
          <svg
            className="w-10 h-10 text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
      <div className="p-4">
        <div className="animate-pulse flex items-center justify-center w-[50%] h-4 bg-gray-300 rounded mb-2"></div>
        <div className="animate-pulse flex items-center justify-center w-[30%] h-4 bg-gray-300 rounded mb-2"></div>

        <div className="flex items-center gap-2 mt-2">
          <div className="animate-pulse flex items-center justify-center w-[108px] max-w-[60%] h-10 bg-gray-300 rounded-md"></div>
          <div className="animate-pulse flex items-center justify-center h-8 w-8 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
