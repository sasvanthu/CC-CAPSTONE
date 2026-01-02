
import { BinStatus, SmartBin, PickupTask } from './types';

export const MOCK_BINS: SmartBin[] = [
  {
    id: 'CHN-001',
    name: 'Adyar Central Hub',
    location: { 
      lat: 13.0012, 
      lng: 80.2565, 
      address: 'Kasturba Nagar, Adyar, Chennai 600020' 
    },
    fillLevel: 82,
    battery: 94,
    status: BinStatus.WARNING,
    lastService: '2024-05-18T08:00:00Z',
    predictedOverflow: '2024-05-20T14:30:00Z',
    temperature: 31,
  },
  {
    id: 'CHN-002',
    name: 'T. Nagar Shopping Plaza',
    location: { 
      lat: 13.0405, 
      lng: 80.2337, 
      address: 'Ranganathan Street, T. Nagar, Chennai 600017' 
    },
    fillLevel: 95,
    battery: 88,
    status: BinStatus.CRITICAL,
    lastService: '2024-05-19T10:00:00Z',
    predictedOverflow: '2024-05-20T09:00:00Z',
    temperature: 34,
  },
  {
    id: 'CHN-003',
    name: 'Marina Beach South',
    location: { 
      lat: 13.0500, 
      lng: 80.2824, 
      address: 'Kamarajar Salai, Marina Beach, Chennai 600005' 
    },
    fillLevel: 45,
    battery: 99,
    status: BinStatus.NORMAL,
    lastService: '2024-05-19T12:00:00Z',
    predictedOverflow: '2024-05-22T18:00:00Z',
    temperature: 30,
  },
  {
    id: 'CHN-004',
    name: 'OMR IT Highway',
    location: { 
      lat: 12.9675, 
      lng: 80.2455, 
      address: 'Rajiv Gandhi Salai, Thoraipakkam, Chennai 600097' 
    },
    fillLevel: 12,
    battery: 82,
    status: BinStatus.NORMAL,
    lastService: '2024-05-18T09:00:00Z',
    predictedOverflow: '2024-05-25T11:00:00Z',
    temperature: 32,
  },
  {
    id: 'CHN-005',
    name: 'Velachery Junction',
    location: { 
      lat: 12.9796, 
      lng: 80.2206, 
      address: 'Velachery Main Road, Chennai 600042' 
    },
    fillLevel: 68,
    battery: 92,
    status: BinStatus.NORMAL,
    lastService: '2024-05-17T15:00:00Z',
    predictedOverflow: '2024-05-21T10:00:00Z',
    temperature: 33,
  }
];

export const MOCK_PICKUPS: PickupTask[] = [
  {
    id: 'TASK-CHN-201',
    binId: 'CHN-002',
    binName: 'T. Nagar Shopping Plaza',
    scheduledTime: '2024-05-20T11:00:00Z',
    priority: 'HIGH',
    status: 'PENDING'
  },
  {
    id: 'TASK-CHN-202',
    binId: 'CHN-001',
    binName: 'Adyar Central Hub',
    scheduledTime: '2024-05-20T13:30:00Z',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS'
  },
  {
    id: 'TASK-CHN-203',
    binId: 'CHN-005',
    binName: 'Velachery Junction',
    scheduledTime: '2024-05-21T09:00:00Z',
    priority: 'LOW',
    status: 'PENDING'
  }
];
