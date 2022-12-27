import Carousel from "./components/Carousel";
import CarouselInfinite from "./components/CarouselInfinite";

const datas = ["1", "2", "3", "4", "5", "6"];

function App() {
  return (
    <>
      <Carousel datas={datas} />;
      <CarouselInfinite datas={datas} />
    </>
  );
}

export default App;
