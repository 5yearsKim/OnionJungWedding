/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, useEffect } from "react"
import { StoreContext } from "@/component/store/context"
import { NAVER_MAP_CLIENT_ID } from "@/env"

const NAVER_MAP_URL = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_CLIENT_ID}`

export const useNaver = () => {
  const { naver, setNaver } = useContext(StoreContext)
  useEffect(() => {
    if (!NAVER_MAP_CLIENT_ID) {
      return
    }

    if (!document.querySelector(`script[src="${NAVER_MAP_URL}"]`)) {
      const script = document.createElement("script")
      script.src = NAVER_MAP_URL
      document.head.appendChild(script)
      script.addEventListener("load", () => {
        setNaver((window as any).naver)
      })
    }
  }, [setNaver])

  return naver
}
