function SkeletonTransaction() {
  return (
    <div className="flex flex-row-reverse justify-between items-center animate-pulse px-4 h-20">
      <div className="flex flex-col gap-1 items-end">
        <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-gray-200 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
      </div>
      <div className="flex gap-4 xs:gap-10 items-center">
        <div className="h-12 bg-gray-300 rounded-full dark:bg-gray-200 w-12"></div>
        <div className="h-2.5 bg-neutral-100 rounded-full dark:bg-gray-200 w-20"></div>
      </div>
    </div>
  );
}

export default SkeletonTransaction;
