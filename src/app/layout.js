import "./globals.css";

export const metadata = {
  title: "Movie DB",
  description: "Movie DataBase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
