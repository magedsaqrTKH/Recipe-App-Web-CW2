import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./home";
import { Auth } from "./auth";
import Cuisines from "./cuisines";
import Recipe from "./recipes";
import RecipeList from "./favorites"
import Recipesaved from "./saved_recs"
import { AnimatePresence } from "framer-motion";
import SearchedRecs from "./searched_recs";


const Pages = () => {
  const location = useLocation()
  return (<AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Auth />} />
      <Route path='/home' element={<Home />}/>
      <Route path="/RecipeList" element={<RecipeList />} />
      <Route path="/Recipesaved/:id" element={<Recipesaved />} />
      <Route path="/searched/:search" element={<SearchedRecs />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/cuisines/:type" element={<Cuisines />} />
     </Routes>
    </AnimatePresence>
  )
}

export default Pages;
