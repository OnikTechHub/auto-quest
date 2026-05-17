import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "AutoQuest - Premium Car Rental Platform",
  description: "Find, Book, and Rent a Car in Easy Steps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0B132B] antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}