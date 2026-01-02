
import { dbService } from './dbService';

let simulationInterval: number | null = null;

export const sensorSimulation = {
  start: () => {
    if (simulationInterval) return;

    console.log("[IoT Engine] Starting live sensor stream to Firebase...");

    simulationInterval = window.setInterval(async () => {
      // Fetch latest state from cloud before updating
      const bins = await dbService.getBins();
      if (bins.length === 0) return;

      // Pick a random bin to update
      const randomIndex = Math.floor(Math.random() * bins.length);
      const targetBin = bins[randomIndex];

      // Simulate realistic Chennai environmental changes
      const fillDelta = Math.random() > 0.4 ? Math.floor(Math.random() * 4) : -Math.floor(Math.random() * 2);
      const newFill = Math.min(100, Math.max(0, targetBin.fillLevel + fillDelta));
      const newTemp = 28 + Math.floor(Math.random() * 8); 
      const batteryDrain = Math.random() * 0.1;

      // Push to Firebase
      dbService.updateBin(targetBin.id, {
        fillLevel: newFill,
        temperature: newTemp,
        battery: Math.max(0, Number((targetBin.battery - batteryDrain).toFixed(2)))
      });

      console.debug(`[IoT Cloud Sync] ${targetBin.name} updated via Firebase`);
    }, 5000); // Pulse every 5 seconds
  },

  stop: () => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
      console.log("[IoT Engine] Sensor stream stopped.");
    }
  },

  is_running: () => simulationInterval !== null
};
