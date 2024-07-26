import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from "@pangeacyber/react-auth";
import { Inter as FontSans, Kanit } from "next/font/google"
import {NextUIProvider} from "@nextui-org/react";
import { cn } from "@/lib/utils"

const kanit = Kanit ({
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-kanit'
})

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
 

export default function App({ Component, pageProps }: AppProps) {
  const hostedLoginURL = process?.env?.NEXT_PUBLIC_AUTHN_HOSTED_LOGIN_URL || "";
  const authConfig = {
      clientToken: process?.env?.NEXT_PUBLIC_AUTHN_CLIENT_TOKEN || "",
      domain: process?.env?.NEXT_PUBLIC_PANGEA_DOMAIN || "",
  };

  return (
    <AuthProvider config={authConfig} loginUrl={hostedLoginURL}>
      <NextUIProvider>
        <Component className={cn(
            "min-h-screen bg-background font-sans antialiased",
            kanit.variable)} {...pageProps} />
      </NextUIProvider>
    </AuthProvider>
  )
}