import { useSelector } from 'react-redux';
import { selectName } from '../../../redux/features/user/userSlice.js';

function DashBoardTitle() {
  const name = useSelector(selectName);
  return (
    <h1 className="text-4xl font-semibold mt-12">
      Hola {name}!
      <span className="text-neutral-300 text-sm block py-1">Lo que hay de nuevo...</span>
    </h1>
  );
}

export default DashBoardTitle;
