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
