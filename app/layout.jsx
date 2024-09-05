import { Montserrat, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/utils/ContextProvider";
import { ReduxProvider } from "@/redux/ReduxProvider";
import ToasterProvider from "@/common/ToasterProvider";

const style = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "User Panel",
  description: "User panel created with Next JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={style.className}>
        <main className="h-screen w-screen">
          <ToasterProvider>
            <ReduxProvider>
              <ModalProvider>{children}</ModalProvider>
            </ReduxProvider>
          </ToasterProvider>
        </main>
      </body>
    </html>
  );
}
