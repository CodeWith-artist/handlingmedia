// app/layout.tsx
import { Roboto } from 'next/font/google'

import "./globals.css";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}