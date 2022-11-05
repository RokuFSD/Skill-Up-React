import { useSelector } from 'react-redux';
import { selectName } from '../../features/user/userSlice.js';

function DashBoardTitle() {
  const name = useSelector(selectName);
  return (
    <h1 className='text-4xl font-semibold'>Hello {name}!
      <span className='text-neutral-300 text-sm block py-1'>Good morning</span>
    </h1>
  );
}

export default DashBoardTitle;
