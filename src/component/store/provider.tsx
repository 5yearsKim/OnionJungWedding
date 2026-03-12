/* eslint-disable @typescript-eslint/no-explicit-any */

import { PropsWithChildren, useState } from "react"
import { StoreContext } from "@/component/store/context"

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [naver, setNaver] = useState<any>(null)

  return (
    <StoreContext.Provider value={{ naver, setNaver }}>
      {children}
    </StoreContext.Provider>
  )
}
