import { BsTrash, BsPencil, BsEye } from 'react-icons/bs'

const CarListItem = ({car, isCollapsed, dropDown, edit, trash}) => {
  return (
    <div key={car.id} className={`mt-2 p-2 border-2 border-purple-700 font-bold rounded-md cursor-pointer transition-all ${isCollapsed ? 'bg-purple-200' : ''}`}>
      <div className='flex justify-between'>
        <div >{car.make + ' ' + car.model + ' ' + car.package} </div>
        <div className='flex items-center'>
          <BsEye onClick={() => dropDown(car.id)} size="19" className='text-black mr-6 hover:text-purple-900 text-bold' />
          <BsPencil onClick={edit} className='text-black mr-6 hover:text-purple-900 text-bold' />
          <BsTrash onClick={trash} className='text-black mr-2 hover:text-purple-900 text-bold' />

        </div>
      </div>
      <div className={`px-3 overflow-hidden transition-all rounded-md bg-white ${isCollapsed ? 'mt-1 p-1' : 'h-0'}`}>
        <div className={`flex `}>
          <div>{`Mileage:`}</div>
          <div className='ml-1'>{car.mileage}</div>
        </div>
        <div className={`flex ${isCollapsed ? 'mt-1' : ''}`}>
          <div>{`Package:`}</div>
          <div className='ml-1'>{car.package}</div>
        </div>
        <div className={`flex ${isCollapsed ? 'mt-1' : ''}`}>
          <div>{`Price:`}</div>
          <div className='ml-1'>{car['price(cents)']}</div>
        </div>
      </div>
    </div>
  )
}

export default CarListItem;