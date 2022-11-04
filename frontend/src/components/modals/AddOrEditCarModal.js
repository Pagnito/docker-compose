import { useState } from 'react';
import carsApi from '../../api';
import StatusPopup from '../common/StatusPopup';

const AddOrEditCarModal = ({ toggle, addCarToState }) => {
  const [state, setState] = useState({
    make: '',
    model: '',
    package: '',
    color: '',
    year: '',
    category: '',
    mileage: '',
    "price(cents)": ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChange = (e) => {
    const name = e.target.name;
    setState({ ...state, [name]: e.target.value });
  }

  const validated = () => {
    if(state.make.length < 3) {
      setError('Make is required.');
      return false;
    }
    if(state.model.length < 3) {
      setError('Model is required.');
      return false;
    }
    if(state.year.toString().length < 4) {
      setError('Year is required.');
      return false;
    }
    if(state.mileage.toString().length === 0) {
      setError('Mileage is required.');
      return false;
    }
    if(state['price(cents)'].toString().length === 0) {
      setError('Price is required.');
      return false;
    }
    return true;
  }

  const saveCar = async () => {
    try {
      if(validated()) {
        const res = await carsApi.postCar(state);
        console.log(res)
        const car = {...state, id: res.data.id};
        addCarToState(car);
        setSuccess('Success!');
        toggle();
      }

    } catch (err) {
      console.log(err)
      setError('Failed to save car.');
    }
  }

  return (
    <div style={{ background: 'rgba(0,0,0,.6)' }} className='fixed h-screen w-full xs:p-2 md:p-20 flex justify-center items-center top-0'>
      <div className='xs:w-full md:w-3/4 xs:h-full md:h-fit bg-white rounded-md'>
        <div className='text-center text-xl font-bold p-5'>Add Your Car</div>
        <div className='p-10 pt-0 pb-6 flex flex-col'>
          {error !== null ? <StatusPopup status={error} type="error" toggle={() => setError(null)} /> : false}
          {success !== null ? <StatusPopup status={success} type="success" toggle={() => setSuccess(null)}/>: false}
          <div className='flex w-full xs:flex-col md:flex-row'>
            <input onChange={onChange} value={state.name} name="make" placeholder="Make" type="text" className='px-3 py-2 rounded-md border-2 border-black mt-3 md:w-1/2 md:mr-2'></input>
            <input onChange={onChange} value={state.model} name="model" placeholder="Model" type="text" className='px-3 py-2 rounded-md border-2 border-black mt-3 md:w-1/2 md:ml-2'></input>
          </div>
          <div className='flex w-full xs:flex-col md:flex-row'>
            <input onChange={onChange} value={state.package} name="package" placeholder="Package" className='px-3 py-2 rounded-md border-2 border-black mt-3 md:w-1/2 md:mr-2'></input>
            <input onChange={onChange} value={state.color} name="color" placeholder="Color" className='px-3 py-2 rounded-md border-2 border-black mt-3 md:w-1/2 md:ml-2'></input>
          </div>
          <div className='flex w-full xs:flex-col md:flex-row'>
            <input onChange={onChange} value={state.year} name="year" placeholder="Year" type="number" className='px-3 py-2 rounded-md border-2 border-black mt-3 md:w-1/2 md:mr-2'></input>
            <input onChange={onChange} value={state.mileage} name="mileage" placeholder="Mileage" type="number" className='px-3 py-2 rounded-md border-2 border-black mt-3 md:w-1/2 md:ml-2'></input>
          </div>
          <div className='flex w-full xs:flex-col md:flex-row'>
            <input onChange={onChange} value={state.category} name="category" placeholder="Category" className='px-3 py-2 rounded-md border-2 border-black mt-3 md:w-1/2 md:mr-2'></input>
            <input onChange={onChange} value={state['price(cents)']} name="price(cents)" placeholder="Price" type="number" className='px-3 py-2 rounded-md border-2 border-black mt-3 md:w-1/2 md:ml-2'></input>
          </div>
          {success ?
            <button onClick={toggle} className="px-3 py-2 mt-3 rounded-md bg-black text-white border-2 transition-all font-bold w-full">Close</button> :
            <div className='flex w-full justify-end'>
              <button onClick={toggle} className="px-3 py-2 mt-3 rounded-md bg-red-400 text-white border-2 transition-all font-bold w-1/2 mr-2">Cancel</button>
              <button onClick={saveCar} className="px-3 py-2 mt-3 rounded-md text-white border-2 bg-black transition-all font-bold w-1/2 ml-2">Submit</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default AddOrEditCarModal