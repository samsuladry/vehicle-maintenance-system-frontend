import { create } from 'zustand';

// Define the type for a maintenance object
type Maintenance = {
  id: number;
  createdAt: string;
  updatedAt: string;
  vehicleId: number;
  status: string;
};

type FailedAlert = boolean;
type SuccessAlert = boolean;

// Define the Zustand store
type MaintenanceState = {
  maintenanceList: Maintenance[];
  fetchMaintenance: () => Promise<void>;
  fetchSingleMaintenance: (id: number) => Promise<Maintenance | null>;
  addMaintenance: (newMaintenance: Omit<Maintenance, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<void>;
  updateMaintenance: (id: number, updatedMaintenance: Pick<Maintenance, 'status'>) => Promise<void>;
  deleteMaintenance: (id: number) => Promise<void>;
  failedAlert: FailedAlert;
  updateFailedAlert: () => void;
  successAlert: SuccessAlert;
  updateSuccessAlert: () => void;
};

export const useMaintenanceStore = create<MaintenanceState>((set, get) => ({
  maintenanceList: [],
  failedAlert: false,
  successAlert: false,

  fetchMaintenance: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/maintenance/getMaintenance');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: Maintenance[] = await response.json();
      set({ maintenanceList: data });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  },

  fetchSingleMaintenance: async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/maintenance/getMaintenance/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: Maintenance = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  },

  addMaintenance: async (newMaintenance) => {
    try {
      const response = await fetch('http://localhost:5000/api/maintenance/addMaintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaintenance),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const createdMaintenance: Maintenance = await response.json();
      set((state) => ({
        maintenanceList: [...state.maintenanceList, createdMaintenance],
        successAlert: true,
        failedAlert: false,
      }));
    } catch (error) {
      console.error('Failed to add maintenance:', error);
      set({ failedAlert: true, successAlert: false });
    }
  },

  updateMaintenance: async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/maintenance/updateMaintenance/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const resData = await response.json();
      if (!resData.ok) {
        throw new Error(`Error: ${resData.status}`);
      }

      const updatedMaintenanceRes: Maintenance = resData.data;

      set((state) => ({
        maintenanceList: state.maintenanceList.map((maintenance) =>
          maintenance.id === updatedMaintenanceRes.id ? updatedMaintenanceRes : maintenance
        ),
        successAlert: true,
        failedAlert: false,
      }));
    } catch (error) {
      console.error('Failed to update maintenance:', error);
      set({ failedAlert: true, successAlert: false });
    }
  },

  deleteMaintenance: async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/maintenance/deleteMaintenance/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      set((state) => ({
        maintenanceList: state.maintenanceList.filter((maintenance) => maintenance.id !== id),
        successAlert: true,
        failedAlert: false,
      }));
    } catch (error) {
      console.error('Failed to delete maintenance:', error);
      set({ failedAlert: true, successAlert: false });
    }
  },

  updateFailedAlert: () => {
    set((state) => ({
      failedAlert: !state.failedAlert,
    }));
  },

  updateSuccessAlert: () => {
    set((state) => ({
      successAlert: !state.successAlert,
    }));
  },
}));
