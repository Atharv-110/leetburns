import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./components/pages/Home";

const App = () => {
  return (
    <main className="relative w-full h-screen bg-slate-100  bg-[linear-gradient(90deg,#21252910_1px,transparent_0),linear-gradient(180deg,#21252910_1px,transparent_0)] bg-[size:28px_28px] md:px-10 px-3">
      <Navbar />
      <HomePage />
      <Footer />
    </main>
  );
};

export default App;
