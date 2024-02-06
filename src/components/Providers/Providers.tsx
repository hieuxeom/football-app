"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticationProviders from "@/components/Providers/AuthenticationProviders";

export default function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	return (
		<SessionProvider>
			<AuthenticationProviders>
				<NextUIProvider navigate={router.push}>
					<ToastContainer closeOnClick={true}></ToastContainer>
					{children}
				</NextUIProvider>
			</AuthenticationProviders>
		</SessionProvider>
	);
}
