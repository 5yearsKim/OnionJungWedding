import { useContext } from "react"
import { ModalContext } from "@/component/modal/context"

export const useModal = () => {
  const { openModal, closeModal } = useContext(ModalContext)
  return { openModal, closeModal }
}
