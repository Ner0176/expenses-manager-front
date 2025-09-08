export interface CreateCategoryPayload {
  tag: string;
  icon: string;
}

export interface ICategory {
  id: number;
  tag: string;
  icon: string;
  isDefault: boolean;
}
