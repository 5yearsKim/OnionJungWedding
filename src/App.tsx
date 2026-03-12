import { InvitationPage } from "@/pages/invitationPage"
import { GenerateUrlPage } from "@/pages/generateUrlPage"
import "@/App.scss"



function App() {
  const path = window.location.pathname

  if (path === "/generateUrl") {
    return <GenerateUrlPage />
  }

  return <InvitationPage />
}


export default App