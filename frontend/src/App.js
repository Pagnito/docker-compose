import './App.css';
import { useEffect, useState } from 'react';
import AddOrEditCarModal from './components/modals/AddOrEditCarModal';
import AreYouSureModal from './components/modals/AreYouSureModal';
import CarListItem from './components/common/CarListItem';
import StatusPopup from './components/common/StatusPopup'
import carsApi from './api'

const App = () => {
  const [sourceCarsList, setSourceCarsList] = useState([]);
  const [carsList, setCarsList] = useState([{
    id: 1,
    make: 'Honda',
    model: 'Civic',
    package: 'Si',
    mileage: '15000',
    "price(cents)": '223525'
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    package: 'Type R',
    mileage: '10000',
    "price(cents)": '223525'
  }
  ]);

  const [collapsed, setCollapsed] = useState([]);
  const [addCarModal, showAddCarModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');


  const getCars = async () => {
    const cars = await carsApi.getCars();
    if (cars.data.length > 0) {
      setCarsList(cars.data);
      setSourceCarsList(cars.data);
    }
  }

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    let filtered = sourceCarsList.filter(car => {
      const make = car.make.toLowerCase();
      const model = car.model.toLowerCase();
      const color = car.color.toLowerCase();
      const category = car.category.toLowerCase();
      const trim = car.package.toLowerCase();
      const lowerCaseSearch = search.toLowerCase();
      return make.includes(lowerCaseSearch) || model.includes(lowerCaseSearch) || trim.includes(lowerCaseSearch) ||
      car.year.toString().includes(lowerCaseSearch) || color.includes(lowerCaseSearch) || category.includes(lowerCaseSearch)
    })
    setCarsList(filtered)
  }, [search])

  const dropDown = (id) => {
    if (!collapsed.includes(id)) {
      setCollapsed([...collapsed, id]);
    } else {
      let collapsedClone = collapsed.slice(0);
      let filtered = collapsedClone.filter(carId => carId !== id);
      setCollapsed(filtered);
    }
  }

  const carsMap = () => {
    return carsList.map(car => {
      let isCollapsed = collapsed.includes(car.id);
      return <CarListItem isCollapsed={isCollapsed} car={car} dropDown={dropDown} trash={() => setDeleteItem(car.id)} edit={carsApi.editCar} />
    })
  }

  const deleteCar = async () => {
    try {
      const res = await carsApi.deleteCar(deleteItem);
      let carsListClone = carsList.slice(0);
      let filtered = carsListClone.filter(car => car.id !== deleteItem);
      setCarsList(filtered);
    } catch (err) {
      setError('Failed to delete car.');
    }
  }

  const addCarToState = (car) => {
    setCarsList([car, ...carsList]);
  }

  return (
    <div className=" bg-slate-50 min-h-screen">
      <header className="w-full p-4 border-b-2 border-purple-900 text-center text-black font-bold shadow-lg">
        yOurCARS
      </header>
      {error !== null ?
        <div className='mx-3 mt-3'><StatusPopup status={error} toggle={() => setError(null)} /></div>
        : false}
      <div className="flex justify-between p-4">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search..." className='px-3 py-2 rounded-md border-2 border-black'></input>
        <button onClick={() => showAddCarModal(addCarModal ? false : true)} className="px-3 py-2 rounded-md text-black border-2 border-black hover:bg-black hover:text-white transition-all font-bold">Add Car</button>
      </div>
      <div className=' px-4'>
        {carsMap()}
      </div>
      {addCarModal ? <AddOrEditCarModal addCarToState={addCarToState} toggle={() => showAddCarModal(false)} /> : false}
      {deleteItem ? <AreYouSureModal action={deleteCar} toggle={() => setDeleteItem(false)} /> : false}
    </div>
  );
}

export default App;