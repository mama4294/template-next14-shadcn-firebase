import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientProviders from "@/components/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDo App",
  description: "Created Using Next.js 14 and Ant Design",
};

//To update for new projects
//- Create firebase project & add google auth secret key to .env.local
//- Add google redirect url to google cloud console. API's / Credentials / Web client

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-1 container">{children}</div>
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClientProviders>
  );
}
