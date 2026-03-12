/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from "react"

export const StoreContext = createContext({
  naver: null as any,
  setNaver: (() => {}) as (naver: any) => void,
})
