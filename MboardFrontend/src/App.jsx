import Data from "./components/MessagesData"
import SignUp from "./components/signUp"
import {BrowserRouter,Routes,Route} from "react-router-dom"

const App = ()=>{
  return(
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Data/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App