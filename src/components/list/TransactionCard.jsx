function TransactionCard({ id, amount, date, concept, type }) {
  return (
    <div className='w-full flex items-center gap-3 px-4 py-2 border-b border-neutral-300 h-20'>
      <div className='w-16'>
        {/*Mock user img*/}
        {/*<img className="rounded-full" src={`https://i.pravatar.cc/150?img=${id}`} alt='user' />*/}
      </div>
      <div className="basis-5/6">
        <p>concepto test</p>
      </div>
      <div className="text-right">
        <p>${id}</p>
        <p>{new Date().getFullYear()}</p>
      </div>
    </div>
  );
}


export default TransactionCard;
