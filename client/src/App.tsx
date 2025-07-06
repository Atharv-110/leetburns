import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./components/pages/Home";

const App = () => {
  return (
    <main className="relative w-full flex flex-col min-h-[100dvh] bg-slate-100  bg-[linear-gradient(90deg,#21252910_1px,transparent_0),linear-gradient(180deg,#21252910_1px,transparent_0)] bg-[size:28px_28px] md:px-10 px-4">
      <Navbar />
      <div className="flex-1">
        <HomePage />
      </div>
      <Footer />
    </main>
  );
};

export default App;
