import { useEffect, useState } from 'react';
import { useVehicleStore } from '../../store/vehicleStore';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import DeleteConfirmationModal from '../Modal/DeleteConfirmation';
import EditModal from '../Modal/EditVehicleModal';

const VehicleList = () => {
  const { vehicleList, fetchVehicles, deleteVehicle } = useVehicleStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState<number | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleEdit = async (id: number) => {
    setVehicleToEdit(id); 
    setShowEditModal(true); 
  }

  const confirmDelete = (id: number) => {
    setVehicleToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (vehicleToDelete !== null) {
      try {
        await deleteVehicle(vehicleToDelete);
        await fetchVehicles();
        setShowDeleteModal(false);
        setVehicleToDelete(null);
      } catch (error) {
        console.error('Failed to delete vehicle:', error);
      }
    }
  }
  

  return (
    <div className='container mx-auto'>
      <DeleteConfirmationModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        type="vehicle"
      />

      <EditModal 
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        vehicleId={vehicleToEdit}
      />

      <h1 className='text-4xl font-bold text-center my-4'>Vehicle List</h1>
      <div className='flex flex-wrap justify-center'>
        {vehicleList.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='table-auto w-full border-collapse'>
              <thead>
                <tr>
                  <th className='px-10 py-5 border'>Name</th>
                  <th className='px-10 py-5 border'>Type</th>
                  <th className='px-10 py-5 border'>Colour</th>
                  <th className='px-10 py-5 border'>CreatedAt</th>
                  <th className='px-10 py-5 border'>UpdatedAt</th>
                  <th className='px-10 py-5 border'>Edit / Delete</th>
                </tr>
              </thead>
              <tbody>
                {vehicleList.map((vehicle) => (
                  <tr key={vehicle.id}>
                    {}
                    <td className='border px-10 py-5 text-lg font-semibold'>{vehicle.name}</td>
                    <td className='border px-10 py-5 text-lg font-semibold'>{vehicle.type}</td>
                    <td className='border px-10 py-5 text-lg font-semibold'>{vehicle.colour}</td>
                    <td className='border px-10 py-5 text-lg font-semibold'>{new Date(vehicle.createdAt).toLocaleString()}</td>
                    <td className='border px-10 py-5 text-lg font-semibold'>{new Date(vehicle.updatedAt).toLocaleString()}</td>
                    
                    <td className='border px-10 py-5 text-lg font-semibold'>{
                      <div className='flex items-center space-x-4'>
                        <button onClick={() => handleEdit(vehicle.id)}>
                          <PencilSquareIcon className="h-6 w-6"/>
                        </button>
                        <button onClick={() => confirmDelete(vehicle.id)}>
                          <TrashIcon className="h-6 w-6"/>
                        </button>
                      </div>

                      } </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-center'>No vehicles available</p>
        )}
      </div>
    </div>
  );
};

export default VehicleList;
