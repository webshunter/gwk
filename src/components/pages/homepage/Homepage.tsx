import Hero from "./Hero";
import CulturePark from "./CulturePark";
import Activities from "./Activities";

const Homepage = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <CulturePark />
      <Activities />
    </div>
  );
};

export default Homepage;
