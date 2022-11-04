import { RiCloseCircleLine } from 'react-icons/ri';

const ErrorPopup = ({ toggle, status, type }) => {
  return (
    <div className={`${type === 'success' ? 'bg-green-400' : 'bg-red-500'} text-white rounded-md p-3 text-lg font-bold text-center relative flex items-center justify-center`}>
      {status}
      <RiCloseCircleLine onClick={toggle} size="25" className='text-white absolute right-4 cursor-pointer' />
    </div>
  )
}

export default ErrorPopup