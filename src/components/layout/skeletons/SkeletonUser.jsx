function SkeletonUser() {
  return (
    <div className='w-20 p-2 flex items-center gap-4 flex-col animate-pulse'>
      <div className='w-12 h-12 rounded-full bg-neutral-200'></div>
      <div className='w-12 h-4 rounded-full bg-neutral-200'></div>
    </div>
  );
}

export default SkeletonUser
