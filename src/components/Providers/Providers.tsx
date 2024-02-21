"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticationProviders from "@/components/Providers/AuthenticationProviders";
import { PrimeReactProvider, PrimeReactContext, APIOptions } from "primereact/api";
import "primereact/resources/themes/tailwind-light/theme.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const options: APIOptions = {
		ripple: true,
	};
	return (
		<SessionProvider>
			<AuthenticationProviders>
				<NextUIProvider navigate={router.push}>
					<PrimeReactProvider value={options}>
						<AntdRegistry>
							<ToastContainer closeOnClick={true}></ToastContainer>
							{children}
						</AntdRegistry>
					</PrimeReactProvider>
				</NextUIProvider>
			</AuthenticationProviders>
		</SessionProvider>
	);
}
