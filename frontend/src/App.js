import './App.css';
import { useEffect, useState } from 'react';
import AddOrEditCarModal from './components/modals/AddOrEditCarModal';
import AreYouSureModal from './components/modals/AreYouSureModal';
import CarListItem from './components/common/CarListItem';
import StatusPopup from './components/common/StatusPopup'
import carsApi from './api'


const App = () => {
  const [sourceCarsList, setSourceCarsList] = useState(null);
  const [carsList, setCarsList] = useState(null);
  const [collapsed, setCollapsed] = useState([]);
  const [addCarModal, showAddCarModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [editItem, setEditItem] = useState(null)
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');


  const getCars = async () => {
    try {
      const cars = await carsApi.getCars();
      if (Array.isArray(cars.data)) {
        let sorted = cars.data.sort((a ,b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
        setCarsList(sorted);
        setSourceCarsList(sorted);
      }
    } catch (err) {
      setError('Failed to load your cars.')
    }
  }

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    if(sourceCarsList !== null) {
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
      setCarsList(filtered);
    }
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
      return <CarListItem isCollapsed={isCollapsed} car={car} dropDown={dropDown} trash={() => setDeleteItem(car.id)} edit={() => editCar(car)} />
    })
  }

  const deleteCar = async () => {
    try {
      const res = await carsApi.deleteCar(deleteItem);
      let carsListClone = carsList.slice(0);
      let sourceCarsListClone = sourceCarsList.slice(0);
      let filtered = carsListClone.filter(car => car.id !== deleteItem);
      let sourceFiltered = sourceCarsListClone.filter(car => car.id !== deleteItem);

      setCarsList(filtered);
      setSourceCarsList(sourceFiltered);
    } catch (err) {
      setError('Failed to delete car.');
    }
  }

  const editCar = (car) => {
    setEditItem(car);
    showAddCarModal(true);
  }

  const addCarToState = (car) => {
    let exists = sourceCarsList.findIndex(c => c.id === car.id);

    if(exists!== -1) {
      let clone = carsList.slice(0);
      let sourceClone = sourceCarsList.slice(0);
      clone.splice(exists, 1, car);
      sourceClone.splice(exists, 1, car);

      setCarsList(clone);
      setSourceCarsList(sourceClone)
    } else {
      setSourceCarsList([car, ...sourceCarsList])
      setCarsList([car, ...carsList]);
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="w-full p-4 border-b-2 border-purple-900 text-center text-black font-bold shadow-lg">
        yOurCARS
      </header>
      {error !== null ?
        <div className='mx-3 mt-3'><StatusPopup status={error} toggle={() => setError(null)} /></div>
        : false}
      <div className="flex justify-between p-4">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search..." className='px-3 py-2 rounded-md border-2 border-black xs:w-3/5 sm:w-auto'></input>
        <button onClick={() => showAddCarModal(addCarModal ? false : true)} className="xs:w-2/5 xs:ml-2 sm:ml-0 sm:w-auto px-3 py-2 rounded-md text-black border-2 border-black hover:bg-black hover:text-white transition-all font-bold">Add Car</button>
      </div>
      <div className='px-4'>
        {sourceCarsList === null ?  
        <div className='flex p-4 items-center justify-center font-bold'>Loading...</div> :
        sourceCarsList.length === 0 ?  <div className='flex p-4 items-center justify-center font-bold'>No Cars.</div> :
        carsMap()}
      </div>
      {addCarModal || editItem !== null ? <AddOrEditCarModal edit={editItem} addCarToState={addCarToState} toggle={() => {showAddCarModal(false); setEditItem(null)}} /> : false}
      {deleteItem ? <AreYouSureModal action={deleteCar} toggle={() => setDeleteItem(false)} /> : false}
    </div>
  );
}

export default App;
