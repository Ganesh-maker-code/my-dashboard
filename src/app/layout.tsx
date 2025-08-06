// src/app/layout.tsx
import "./globals.css";
import AntdRegistry from "./AntdRegistry";
import ClientLayout from "../components/ClientLayout"; // Import the new client component

export const metadata = {
  title: "Dynamic Dashboard",
  description: "A dashboard with a map and timeline",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ClientLayout>{children}</ClientLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
