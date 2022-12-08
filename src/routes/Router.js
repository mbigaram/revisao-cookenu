import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import DetailsPage from "../pages/DetailsPage/DetailsPage"
import SignupPage from "../pages/SignupPages/SignupPage"
import CreateRecipePage from "../pages/CreateRecipePage/CreateRecipePage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"


function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element= {<HomePage />}/>
            <Route path="/login" element= {<LoginPage />}/>
            <Route path="/recipe/recipeId" element= {<DetailsPage />}/>
            <Route path="/signup" element= {<SignupPage />}/>
            <Route path="/recipe/new" element= {<CreateRecipePage />}/>
            <Route path="*" element= {<NotFoundPage />}/>
        </Routes>
        </BrowserRouter>
    )
}
export default Router