import axios from 'axios'
const url = 'http://localhost:4000/';

export default {
  getCars: async () => {
    try {
      return await axios.get(url+'cars');
    } catch (err) {
      console.log('\n\n API ERROR - GET CARS: ' + err.message);
      return new Error()
    }
  },
  getCar: async (id) => {
    try {
      return await axios.get(url+'cars/' + id);
    } catch (err) {
      console.log('\n\n API ERROR - GET CAR: ' + err.message);
      return new Error()
    }
  },
  postCar: async (car) => {
    try {
      console.log('POSTING')
      return await axios.post(url+'cars', car);
    } catch (err) {
      console.log('\n\n API ERROR - POST CAR: ' + err.message);
      return new Error()
    }
  },
  editCar: async (id, car) => {
    try {
      return await axios.put(url+'cars/' + id, car);
    } catch (err) {
      console.log('\n\n API ERROR - EDIT CAR: ' + err.message);
      return new Error()
    }
  },
  deleteCar: async (id) => {
    try {
      return await axios.delete(url+'cars/' + id);
    } catch (err) {
      console.log('\n\n API ERROR - DELETE CAR: ' + err.message);
      return new Error()
    }
  },
}