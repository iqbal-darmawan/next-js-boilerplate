/* Base class data bisa ditambahakan */
export type BaseEntity = {
  id: string;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;
