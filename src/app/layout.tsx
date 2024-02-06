// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
import "./global.css";
import Providers from "@/components/Providers/Providers";
import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Section from "@/components/Section";
import Container from "@/components/Container";
import {baseUrl} from "@/utils/requests/baseUrl";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang="en" className="light">
        <body>
        <Providers>
            <Container className="min-h-screen flex">
                <Sidebar className="w-2/12"/>
                <Section className="min-h-screen h-screen">
                        {children}
                </Section>
            </Container>
        </Providers>
        </body>
        </html>
    );
}
