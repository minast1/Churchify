//import { fetch } from '@remix-run/node';
import create from 'zustand'

export type fileType = {
    name: string;
    lastModified: number;
    extension: string;
    path: string;
    contentType: string;
    size: number;
  };


type storeType = {
file:  File[] | []
    setFile: (to: File[]) => void 
}

const useStore = create<storeType>(set => ({
  file: [] ,
  setFile: (to) => set(state => ({ file: to})),
}))

export { useStore };