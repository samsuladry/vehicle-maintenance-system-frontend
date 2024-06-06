import { create } from "zustand";

// Define the type for a vehicle object
type Vehicle = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  type: string;
  colour: string;
};

type FailedAlert = boolean;
type SuccessAlert = boolean;

// Define the Zustand store
type VehicleState = {
  vehicleList: Vehicle[];
  fetchVehicles: () => Promise<void>;
  fetchVehicle: (id: number) => Promise<Vehicle | null>;
  addVehicle: (newVehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateVehicle: (id: number, updatedVehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteVehicle: (id: number) => Promise<void>;
  failedAlert: FailedAlert;
  updateFailedAlert: () => void;
  successAlert: SuccessAlert;
  updateSuccessAlert: () => void;
};

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicleList: [],
  failedAlert: false,
  successAlert: false,

  fetchVehicles: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vehicle/getVehicle");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: Vehicle[] = await response.json();
      set({ vehicleList: data });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  },

  fetchVehicle: async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vehicle/getVehicle/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: Vehicle = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  },

  addVehicle: async (newVehicle) => {
    try {
      const response = await fetch('http://localhost:5000/api/vehicle/addVehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVehicle),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const createdVehicle: Vehicle = await response.json();
      set((state) => ({
        vehicleList: [...state.vehicleList, createdVehicle],
        successAlert: true,
        failedAlert: false, 
      }));
    } catch (error) {
      console.error('Failed to add vehicle:', error);
      set({ failedAlert: true, successAlert: false });
    }
  },

  updateVehicle: async (id, updatedVehicle) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vehicle/updateVehicle/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVehicle)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const resData = await response.json();
      if (!resData.ok) {
        throw new Error(`Error: ${resData.status}`);
      }

      const updatedVehicleRes: Vehicle = resData.data;
      set((state) => ({
        vehicleList: state.vehicleList.map((vehicle) =>
          vehicle.id === updatedVehicleRes.id ? updatedVehicleRes : vehicle
        ),
        successAlert: true,
        failedAlert: false,
      }));

    } catch (error) {
      console.error('Failed to update vehicle: ', error);
      set({ failedAlert: true, successAlert: false });
    }
  },

  deleteVehicle: async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vehicle/deleteVehicle/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      set((state) => ({
        vehicleList: state.vehicleList.filter((vehicle) => vehicle.id !== id),
        successAlert: true,
        failedAlert: false,  
      }));
    } catch (error) {
      console.error('Failed to delete vehicle: ', error);
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
