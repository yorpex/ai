import "@/styles/globals.css";

import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

export const metadata = {
	title: "Yorpex AI",
	description: "By felipes.dev",
	creator: "Luis Felipe",
	authors: [{ name: "Luis Felipe", url: "https://felipes.dev" }],
	openGraph: {
		title: "Yorpex AI",
		description: "By felipes.dev",
		images: [
			{
				url: "https://yorpex-ai.vercel.app/og/default.png",
			},
		],
	},
	twitter: {
		title: "Yorpex AI",
		description: "By felipes.dev",
		images: [
			{
				url: "https://yorpex-ai.vercel.app/og/default.png",
			},
		],
	},
	icons: [{ rel: "icon", url: "/favicon.ico" }],
} as Metadata;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					GeistSans.variable,
					GeistMono.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
}
