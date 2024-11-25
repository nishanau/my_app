import "./globals.css";
import "antd/dist/reset.css"; // Import Ant Design CSS
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";// Import AuthProvider

export const metadata = {
  title: "E-commerce Store",
  description: "An amazing e-commerce experience created with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.16.13/antd.min.css"
          integrity="sha384-xbufngNfJ3Dl8H0GZJ0SJeM3AlRi5EF6dEhUG00NSUmlV2BAnMtLnykHg2GvNcGJ"
          crossOrigin="anonymous"
        />
      </head>

      <body className="antialiased">
        <AuthProvider>
          <Navbar />
          <div className="site-layout-content">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
