import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
<<<<<<< HEAD
import { Toaster } from "react-hot-toast";
=======
>>>>>>> e1ac885f1fcacbf918e9788eb830f2b0c2b9ffb7

export const metadata = {
  title: "AutoQuest - Premium Car Rental Platform",
  description: "Find, Book, and Rent a Car in Easy Steps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#fdfbf7f0] antialiased">
        <Navbar />
<<<<<<< HEAD
          <Toaster position="top-center" />
=======
>>>>>>> e1ac885f1fcacbf918e9788eb830f2b0c2b9ffb7
        {children}
        <Footer />
      </body>
    </html>
  );
}