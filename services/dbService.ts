
import { ref, onValue, set, get, update } from "firebase/database";
import { db } from "./firebase";
import { SmartBin, BinStatus } from '../types';
import { MOCK_BINS } from '../constants';

const BINS_PATH = 'chennai/bins';

export const dbService = {
  // Initialize Firebase with Chennai data if empty
  init: async () => {
    try {
      const snapshot = await get(ref(db, BINS_PATH));
      if (!snapshot.exists()) {
        console.log("Seeding Firebase with initial Chennai bin data...");
        // Convert array to object for Firebase (using IDs as keys)
        const initialData: Record<string, SmartBin> = {};
        MOCK_BINS.forEach(bin => {
          initialData[bin.id] = bin;
        });
        await set(ref(db, BINS_PATH), initialData);
      }
    } catch (error) {
      console.error("Firebase Init Error:", error);
    }
  },

  // Start listening for real-time changes
  listenToUpdates: () => {
    const binsRef = ref(db, BINS_PATH);
    onValue(binsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object back to array for the UI
        const binsArray = Object.values(data) as SmartBin[];
        window.dispatchEvent(new CustomEvent('smartbin_db_update', { detail: binsArray }));
      }
    });
  },

  // Get current bins (local cache or immediate fetch)
  getBins: async (): Promise<SmartBin[]> => {
    const snapshot = await get(ref(db, BINS_PATH));
    return snapshot.exists() ? Object.values(snapshot.val()) : MOCK_BINS;
  },

  // Update a specific bin's sensor data in the cloud
  updateBin: async (binId: string, updates: Partial<SmartBin>) => {
    try {
      const binRef = ref(db, `${BINS_PATH}/${binId}`);
      
      // Calculate derived status if fill level changed
      if (updates.fillLevel !== undefined) {
        if (updates.fillLevel >= 90) updates.status = BinStatus.CRITICAL;
        else if (updates.fillLevel >= 75) updates.status = BinStatus.WARNING;
        else updates.status = BinStatus.NORMAL;
      }

      await update(binRef, updates);
    } catch (error) {
      console.error("Firebase Update Error:", error);
    }
  },

  // Reset database to defaults (Clear and Re-seed)
  reset: async () => {
    const initialData: Record<string, SmartBin> = {};
    MOCK_BINS.forEach(bin => {
      initialData[bin.id] = bin;
    });
    await set(ref(db, BINS_PATH), initialData);
  }
};
