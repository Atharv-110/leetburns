import Navbar from "./components/Navbar";
import HomePage from "./components/pages/Home";

const App = () => {
  return (
    <main className="w-full h-screen bg-slate-200  bg-[linear-gradient(90deg,#80808012_1px,transparent_0),linear-gradient(180deg,#80808012_1px,transparent_0)] bg-[size:24px_24px] md:px-10 px-3">
      <Navbar />
      <HomePage />
    </main>
  );
};

export default App;
