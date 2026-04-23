/**
 * Ejemplo de modelo/interfaz TypeScript.
 * Agrega aquí tus tipos de dominio: Gasto, Categoria, Usuario, etc.
 */

export interface ExampleItem {
  id: string;
  name: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  error?: string;
}
