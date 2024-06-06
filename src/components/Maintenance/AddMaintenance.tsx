import React, { FormEvent, useEffect, useState } from 'react';
import { useMaintenanceStore } from '../../store/maintenanceStore';
import { useVehicleStore } from '../../store/vehicleStore';

type Props = {};

const AddMaintenance = (props: Props) => {
  const { maintenanceList, fetchMaintenance, addMaintenance } = useMaintenanceStore();
  const { vehicleList, fetchVehicles } = useVehicleStore();
  const [vehicleId, setVehicleId] = useState<number>(-1);

  useEffect(() => {
    fetchVehicles();
    fetchMaintenance();
  }, [fetchVehicles, fetchMaintenance]);

  const handleAddMaintenance = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (vehicleId !== -1) {
        const newMaintenance = {
          vehicleId
        };

        await addMaintenance(newMaintenance);
        setVehicleId(-1);
        await fetchVehicles();
        await fetchMaintenance();
      } else {
        throw new Error("Vehicle ID is not selected");
      }
    } catch (error) {
      console.error('Error adding maintenance:', error);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-4xl mt-10'>
        <form onSubmit={handleAddMaintenance} className='rounded px-8 pt-6 pb-8 mb-4'>

          <div className='flex flex-wrap items-center mb-4 space-x-4'>

            <div >
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='type'>
                Vehicle Name
              </label>
              <div className='inline-block relative w-64'>
                <select
                  className='block appearance-none w-full border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                  id='type'
                  value={vehicleId}
                  onChange={(e) => setVehicleId(Number(e.target.value))}
                >
                  <option value={-1} disabled>Select Vehicle</option>
                  {vehicleList.map((vehicle) => {
                    const maintenance = maintenanceList.find((maint) =>{ 
                      if (maint.status) {
                        if (maint.status.toLocaleLowerCase() != 'done') {
                          return vehicle.id === maint.vehicleId
                        }
                        
                      }
                      
                    });
                    return (
                      maintenance ? null : <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                    );
                  })}
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Add Maintenance
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddMaintenance;
