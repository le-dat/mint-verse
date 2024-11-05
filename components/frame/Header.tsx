"use client";

import { Brain } from "lucide-react"; // Assuming Brain icon represents AI
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Brain className="h-8 w-8 cursor-pointer" onClick={() => handleNavigation("/")} />
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => handleNavigation("/")}>
            Mint Verse
          </h1>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => handleNavigation("/")} className="btn">
            Chat
          </button>
          <button onClick={() => handleNavigation("/my-collections")} className="btn">
            My Collection
          </button>
          <button onClick={() => handleNavigation("/marketplace")} className="btn">
            Marketplace
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
