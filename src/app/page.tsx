import { Chat } from "@/components/chat";
import { GithubButton } from "@/components/ui/github-button";
import Link from "next/link";

export default function HomePage() {
	return (
		<>
			<div className="grid min-h-screen w-full grid-rows-[auto_1fr_auto]">
				<header className="flex w-full justify-between p-2">
					<Link href="/">
						<h1 className="text-xl font-bold select-none">yorpex ai</h1>
					</Link>
				</header>
				<div className="flex w-full justify-center">
					<main className="grid w-full relative max-w-screen-lg grid-rows-[1fr_auto]">
						<Chat />
					</main>
				</div>
				<footer className="p-4 w-full justify-end flex">
					<GithubButton />
				</footer>
			</div>
		</>
	);
}
