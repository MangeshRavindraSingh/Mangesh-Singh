import { createContext } from 'react';

export const FetchToggle = createContext<{reFetch:boolean, setReFetch: any}>({reFetch:false, setReFetch: ()=>{}});