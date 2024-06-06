import React, { useState, useEffect } from 'react';
import { useVehicleStore } from '../../store/vehicleStore';
import { useMaintenanceStore } from '../../store/maintenanceStore';

type Props = {
  isOpen: boolean | undefined; 
  onClose: () => void;
  maintenanceId: number | null; 
};

const EditMaintenanceModal = ({ isOpen, onClose, maintenanceId }: Props) => {
  const [vehicleName, setVehicleName] = useState('');
  const [maintenanceStatus, setMaintenanceStatus] = useState('');
  const [initialVehicleName, setInitialVehicleName] = useState('');
  const [initialStatus, setInitialStatus] = useState('');
  const { vehicleList } = useVehicleStore();
  const { fetchSingleMaintenance, updateMaintenance } = useMaintenanceStore();

  useEffect(() => {
    if (maintenanceId != null) {
      fetchSingleMaintenance(maintenanceId).then((maint) => {
        if(maint && vehicleList) {
          vehicleList.map((vehicle) => {
            if(vehicle.id == maint.vehicleId) {
              setVehicleName(vehicle.name);
              setMaintenanceStatus(maint.status)
              // initial values
              setInitialVehicleName(vehicle.name);
              setInitialStatus(maint.status)
            }
          })
        }
      })
      
    }
  }, [maintenanceId, fetchSingleMaintenance]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if(maintenanceId != null) {
      
      await updateMaintenance(maintenanceId, { status: maintenanceStatus })
      setVehicleName('');
      setMaintenanceStatus('')
      // initial values
      setInitialVehicleName('');
      setInitialStatus('')
    }
    onClose();
  };


  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden={!isOpen}
      className={`fixed top-0 right-0 left-0 z-50 w-full h-full overflow-y-auto overflow-x-hidden flex justify-center items-center ${isOpen ? '' : 'hidden'}`}
    >
      <div className="relative p-8 w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {maintenanceId ? 'Edit Maintenance' : null }
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

            <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-white dark:text-white">Vehicle Name: {initialVehicleName}</p>
                <p className="text-base leading-relaxed text-white dark:text-white">Vehicle Status: {initialStatus}</p>
            </div>

            <form onSubmit={handleSubmit} className='rounded px-8 pt-6 pb-8 mb-4'>

              <div className='flex flex-wrap items-center mb-4 space-x-4'>

                <div >
                  <label className='red block text-white text-sm font-bold mb-2' htmlFor='type'>
                    Status
                  </label>
                  <div className='inline-block relative w-64'>
                    <select
                      className='block appearance-none w-full border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                      id='type'
                      value={-1}
                      onChange={(e) => setMaintenanceStatus(e.target.value)}
                    >
                      <option value={-1} disabled >Update Status</option>
                      { maintenanceStatus.toLowerCase() == 'inspection' ? null : <option value='INSPECTION'>INSPECTION</option> }
                      { maintenanceStatus.toLowerCase() == 'wip' ? null : <option value='WIP'>WIP</option> }
                      <option value='DONE'>DONE</option>
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
    </div>
  );
};

export default EditMaintenanceModal;
