// Global TypeScript interfaces

export type ActionResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

export interface BaseEntity {
  id: number;
  createdAt: Date;
}

export interface TimeSlot {
  from: string;
  to: string; 
  active: boolean;
}

export interface Availability {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}