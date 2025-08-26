import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { initScrollReveal } from "@/lib/scrollReveal";

function App() {
  useEffect(() => {
    // Initialize scroll reveal on mount (slightly earlier reveal, smoother feel)
    const cleanup = initScrollReveal({
      rootMargin: "0px 0px -15% 0px",
      threshold: 0.1,
      once: true,
    });
    return cleanup;
  }, []);
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
