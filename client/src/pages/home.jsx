
import { motion } from "framer-motion";
import Randomizor from "../components/Browse";
import SearchBar from "../components/Search";
import CuisinesSearch from "../components/Cuisines";

const Home = () => {
  return ( <motion.div> <CuisinesSearch /> <SearchBar /> <Randomizor /> </motion.div>)
}

export default Home;
