import React, { useState, useEffect } from 'react';
import { useVehicleStore } from '../../store/vehicleStore';

type Props = {
  isOpen: boolean | undefined; 
  onClose: () => void;
  vehicleId: number | null; 
};

const EditVehicleModal = ({ isOpen, onClose, vehicleId }: Props) => {
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleColour, setVehicleColour] = useState('');
  const [initialVehicleName, setInitialVehicleName] = useState('');
  const [initialVehicleType, setInitialVehicleType] = useState('');
  const [initialVehicleColour, setInitialVehicleColour] = useState('');
  const { fetchVehicle, updateVehicle } = useVehicleStore();

  useEffect(() => {
    if (vehicleId !== null) {
      fetchVehicle(vehicleId).then((vehicle) => {
        if (vehicle) {
          setVehicleName(vehicle.name);
          setVehicleType(vehicle.type);
          setVehicleColour(vehicle.colour);
          // initial values
          setInitialVehicleName(vehicle.name);
          setInitialVehicleType(vehicle.type);
          setInitialVehicleColour(vehicle.colour);
        }
      });
    }
  }, [vehicleId, fetchVehicle]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (vehicleId !== null) {
        await updateVehicle(vehicleId, { name: vehicleName, type: vehicleType, colour: vehicleColour });
        setVehicleName('');
        setVehicleType('');
        setVehicleColour('');
        setInitialVehicleName('');
        setInitialVehicleType('');
        setInitialVehicleColour('');
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
              {vehicleId ? 'Edit Vehicle' : null }
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
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">Vehicle Name: {initialVehicleName}</p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">Vehicle Type: {initialVehicleType}</p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">Vehicle Colour: {initialVehicleColour}</p>
            </div>

          <form onSubmit={handleSubmit} className="rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex flex-wrap items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Vehicle Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="name"
                  type="text"
                  placeholder="Vehicle Name"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                />
              </div>

              <div className="w-full md:w-1/3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="type"
                >
                  Vehicle Type
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="type"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <option value="" disabled>Select Type</option>
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="colour"
                >
                  Vehicle Colour
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="colour"
                  type="text"
                  placeholder="Vehicle Colour"
                  value={vehicleColour}
                  onChange={(e) => setVehicleColour(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {vehicleId ? 'Update Vehicle' : 'Add Vehicle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVehicleModal;
