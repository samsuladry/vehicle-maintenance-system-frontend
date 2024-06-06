import React, { useState, FormEvent } from 'react';
import { useVehicleStore } from '../../store/vehicleStore';

const AddVehicle = () => {
  const addVehicle = useVehicleStore(state => state.addVehicle);
  const fetchVehicles = useVehicleStore(state => state.fetchVehicles);
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleColour, setVehicleColour] = useState('');

  const handleAddVehicle = async (e: FormEvent) => {
    e.preventDefault();
    const newVehicle = {
      name: vehicleName,
      type: vehicleType,
      colour: vehicleColour,
    };

    try {
      await addVehicle(newVehicle);
      setVehicleName('');
      setVehicleType('');
      setVehicleColour('');
      await fetchVehicles();
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-4xl mt-10'>
        <form onSubmit={handleAddVehicle} className='rounded px-8 pt-6 pb-8 mb-4'>

          <div className='flex flex-wrap items-center mb-4 space-y-4 md:space-y-0 md:space-x-4'>
            <div className='w-full md:w-1/4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Vehicle Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10'
                id='name'
                type='text'
                placeholder='Vehicle Name'
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
              />
            </div>

            <div className='w-full md:w-1/4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='type'>
                Vehicle Type
              </label>
              <div className='relative'>
                <select
                  className='block appearance-none w-full border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-10'
                  id='type'
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value='' disabled>Select Type</option>
                  <option value='Car'>Car</option>
                  <option value='Van'>Van</option>
                  <option value='Truck'>Truck</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/>
                  </svg>
                </div>
              </div>
            </div>

            <div className='w-full md:w-1/4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='colour'>
                Vehicle Colour
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10'
                id='colour'
                type='text'
                placeholder='Vehicle Colour'
                value={vehicleColour}
                onChange={(e) => setVehicleColour(e.target.value)}
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Add Vehicle
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
