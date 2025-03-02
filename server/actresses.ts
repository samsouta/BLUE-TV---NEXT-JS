import { ActressResponse } from "@/src/types/actressType";

export const actresses = async (): Promise<ActressResponse | null> => {
    try {
        const res = await fetch(`https://bluetv.x10.mx/api/v1/act/names/all`);
    
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
    
        const data = await res.json();
        return data;
        
      } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Ensure a consistent return type
      }
}