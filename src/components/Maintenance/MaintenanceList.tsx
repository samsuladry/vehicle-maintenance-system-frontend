import React, { useEffect, useState } from 'react';
import { useMaintenanceStore } from '../../store/maintenanceStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { PencilSquareIcon, TrashIcon, LockClosedIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import DeleteConfirmationModal from '../Modal/DeleteConfirmation';
import EditMaintenanceModal from '../Modal/EditMaintenanceModal';

type Vehicle = {
  id: number;
  name: string;
  type: string;
  colour: string;
  createdAt: string;
  updatedAt: string;
};

type Maintenance = {
  id: number;
  vehicleId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type VehicleColumns = 'name' | 'type' | 'colour' | 'createdAt' | 'updatedAt';

const MaintenanceList = () => {
  const { maintenanceList, fetchMaintenance, deleteMaintenance } = useMaintenanceStore();
  const { vehicleList, fetchVehicles } = useVehicleStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [maintenanceToDelete, setMaintenanceToDelete] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [maintenanceToEdit, setMaintenanceToEdit] = useState<number | null>(null);
  const [order, setOrder] = useState(true); // true for asc
  const [sortedList, setSortedList] = useState<Maintenance[]>([]);

  useEffect(() => {
    fetchVehicles();
    fetchMaintenance();
  }, [fetchVehicles, fetchMaintenance]);

  useEffect(() => {
    setSortedList(maintenanceList);
  }, [maintenanceList]);

  const sorting = (col: VehicleColumns) => {
    const sorted = [...sortedList].sort((a, b) => {
      const vehicleThatMatchMaintenanceA = vehicleList.find((v) => v.id === a.vehicleId);
      const vehicleThatMatchMaintenanceB = vehicleList.find((v) => v.id === b.vehicleId);

      if (vehicleThatMatchMaintenanceA && vehicleThatMatchMaintenanceB) {
        if (order) {
          return vehicleThatMatchMaintenanceA[col].toString().localeCompare(vehicleThatMatchMaintenanceB[col].toString(), undefined, { sensitivity: 'base' });
        } else {
          return vehicleThatMatchMaintenanceB[col].toString().localeCompare(vehicleThatMatchMaintenanceA[col].toString(), undefined, { sensitivity: 'base' });
        }
      }
      return 0;
    });
    setOrder(!order);
    setSortedList(sorted);
  };

  const handleEdit = async (id: number) => {
    setMaintenanceToEdit(id);
    setShowEditModal(true);
  };

  const confirmDelete = (id: number) => {
    setMaintenanceToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (maintenanceToDelete !== null) {
      try {
        await deleteMaintenance(maintenanceToDelete);
        await fetchMaintenance();
        setShowDeleteModal(false);
        setMaintenanceToDelete(null);
      } catch (error) {
        console.error('Failed to delete maintenance:', error);
      }
    }
  };

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
                  <th className="px-10 py-5 border cursor-pointer" onClick={() => sorting('name')}>
                    <div className='flex items-center justify-center'>
                      <span className='pr-2'>Vehicle Name</span>
                      { order ? <ChevronDownIcon className="h-6 w-6"/> : <ChevronUpIcon className="h-6 w-6"/>}
                    </div>
                  </th>
                  <th className="px-10 py-5 border">Status</th>
                  <th className="px-10 py-5 border">Created At</th>
                  <th className="px-10 py-5 border">Updated At</th>
                  <th className="px-10 py-5 border">Edit / Delete</th>
                </tr>
              </thead>
              <tbody>
                {sortedList.map((maint) => {
                  const vehicle = vehicleList.find((v => v.id === maint.vehicleId));
                  return (
                    <tr key={maint.id}>
                      <td className="px-10 py-5 border text-lg font-semibold">{vehicle?.name}</td>
                      <td className="px-10 py-5 border text-lg font-semibold">{maint.status}</td>
                      <td className="px-10 py-5 border text-lg font-semibold">{new Date(maint.createdAt).toLocaleString()}</td>
                      <td className="px-10 py-5 border text-lg font-semibold">{new Date(maint.updatedAt).toLocaleString()}</td>

                      <td className="px-10 py-5 border text-lg font-semibold">
                        {maint && maint.status && maint.status.toLowerCase() !== 'done' ? (
                          <div className='flex justify-center space-x-4'>
                            <button onClick={() => handleEdit(maint.id)}>
                              <PencilSquareIcon className="h-6 w-6"/>
                            </button>
                            <button onClick={() => confirmDelete(maint.id)}>
                              <TrashIcon className="h-6 w-6"/>
                            </button>
                          </div>
                        ) : (
                        <div className='flex justify-center'>
                          <LockClosedIcon className="h-6 w-6"/>
                        </div>
                        )}
                      </td>
                    </tr>
                  );
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
