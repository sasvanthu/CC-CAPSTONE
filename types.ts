
export enum BinStatus {
  NORMAL = 'NORMAL',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
  OFFLINE = 'OFFLINE'
}

export interface SmartBin {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  fillLevel: number; // 0-100
  battery: number; // 0-100
  status: BinStatus;
  lastService: string;
  predictedOverflow: string; // ISO Date
  temperature: number;
}

export interface PickupTask {
  id: string;
  binId: string;
  binName: string;
  scheduledTime: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface AnalyticsData {
  timestamp: string;
  usage: number;
  prediction: number;
}
