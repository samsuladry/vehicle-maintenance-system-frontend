import React, { useEffect, useState } from 'react';
import { useMaintenanceStore } from '../../store/maintenanceStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { PencilSquareIcon, TrashIcon, NoSymbolIcon } from "@heroicons/react/24/solid";
import DeleteConfirmationModal from '../Modal/DeleteConfirmation';
import EditMaintenanceModal from '../Modal/EditMaintenanceModal';

const MaintenanceList = () => {
  const { maintenanceList, fetchMaintenance, deleteMaintenance } = useMaintenanceStore();
  const { vehicleList, fetchVehicles } = useVehicleStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [maintenanceToDelete, setMaintenanceToDelete] = useState<number | null>(null);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [maintenanceToEdit, setMaintenanceToEdit] = useState<number | null>(null);

  useEffect(() => {
    fetchVehicles();
    fetchMaintenance();
  }, [fetchVehicles, fetchMaintenance]);

  const handleEdit = async (id: number) => {
    setMaintenanceToEdit(id)
    setShowEditModal(true)
  }

  const confirmDelete = (id: number) => {
    setMaintenanceToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (maintenanceToDelete !== null) {
      try {
        await deleteMaintenance(maintenanceToDelete);
        await fetchVehicles();
        setShowDeleteModal(false);
        setMaintenanceToDelete(null);
      } catch (error) {
        console.error('Failed to delete vehicle:', error);
      }
    }
  }

  return (
    <div className="container mx-auto">
      <DeleteConfirmationModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        type='maintenance service'
      />

      <EditMaintenanceModal 
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        maintenanceId={maintenanceToEdit}
      />
      
      <h1 className="text-4xl font-bold text-center my-4">Maintenance List</h1>
      <div className="flex flex-wrap justify-center">
        {maintenanceList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-10 py-5 border">Vehicle Name</th>
                  <th className="px-10 py-5 border">Status</th>
                  <th className="px-10 py-5 border">Created At</th>
                  <th className="px-10 py-5 border">Updated At</th>
                  <th className="px-10 py-5 border">Edit / Delete</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceList.map((maint) => {
                  const vehicle = vehicleList.find((v => v.id === maint.vehicleId));
                  return (
                    <tr key={maint.id}>
                      <td className="px-10 py-5 border text-lg font-semibold">{vehicle?.name}</td>
                      <td className="px-10 py-5 border text-lg font-semibold">{maint.status}</td>
                      <td className="px-10 py-5 border text-lg font-semibold">{new Date(maint.createdAt).toLocaleString()}</td>
                      <td className="px-10 py-5 border text-lg font-semibold">{new Date(maint.updatedAt).toLocaleString()}</td>

                      <td className="px-10 py-5 border text-lg font-semibold">
                        {maint && maint.status && maint.status.toLocaleLowerCase() !== 'done' ? (
                          <div className='flex items-center space-x-4'>
                            <button onClick={() => handleEdit(maint.id)}>
                              <PencilSquareIcon className="h-6 w-6"/>
                            </button>
                            <button onClick={() => confirmDelete(maint.id)}>
                              <TrashIcon className="h-6 w-6"/>
                            </button>
                          </div>
                        ) : <NoSymbolIcon className="h-6 w-6"/>}
                      </td>


                    </tr>
                  )
                  
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No maintenances available</p>
        )}
      </div>
    </div>
  );
};

export default MaintenanceList;
