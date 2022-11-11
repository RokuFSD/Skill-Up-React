function EmptyList() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <svg className='w-16 h-16 text-neutral-300' viewBox='0 0 20 20' fill='currentColor'>
          <path fillRule='evenodd'
                d='M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 112 0v3a1 1 0 11-2 0v-3zm1-5a1 1 0 100 2 1 1 0 000-2z'
                clipRule='evenodd' />
        </svg>
        <p className='text-neutral-300'>No hay resultados</p>
      </div>
    </div>
  );
}

export default EmptyList;

