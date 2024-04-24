"use client";

import { useChat } from "ai/react";
import { ArrowUp, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MemoizedReactMarkdown } from "./markdown";
import { Button } from "./ui/button";
import { CodeBlock } from "./ui/codeblock";
import { Textarea } from "./ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

export function Chat() {
	const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
		useChat();
	const formRef = useRef<HTMLFormElement>(null);
	const lastMessageRef = useRef<HTMLLIElement>(null);

	const scrollToBottom = () => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<>
			<div className="absolute w-full flex justify-center">
				<p
					className={`text-center absolute font-mono text-sm transition text-foreground/50 ${
						messages.length === 0 ? "opacity-100" : "opacity-0"
					}`}
				>
					Start by typing a prompt
				</p>
			</div>
			<ul className="relative max-h-[77.715vh] w-full space-y-8 overflow-y-scroll p-2 [&::-webkit-scrollbar-thumb]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar]:bg-foreground/5">
				{messages.map((message) => (
					<li
						key={message.id}
						className={
							"animate-message-in overflow-x-auto [&::-webkit-scrollbar-thumb]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar]:bg-foreground/5 flex w-full sm:w-1/2 space-x-2 rounded-lg p-4 sm:odd:ml-0 sm:odd:mr-auto odd:rounded-tl-none odd:bg-foreground/[0.035] odd:text-foreground sm:even:ml-auto sm:even:mr-0 even:rounded-br-none even:bg-primary even:text-background"
						}
					>
						<MemoizedReactMarkdown
							className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
							remarkPlugins={[remarkGfm, remarkMath]}
							components={{
								p({ children }) {
									return <p className="mb-2 last:mb-0">{children}</p>;
								},
								a({ children, href }) {
									return (
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Link
														href={href ?? "/"}
														target="_blank"
														rel="noopener noreferrer"
													>
														<span className="underline">{children}</span>
													</Link>
												</TooltipTrigger>
												<TooltipContent>
													<p>Open in new tab</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									);
								},
								code({ className, children }) {
									const match = /language-(\w+)/.exec(className ?? "");
									return (
										<CodeBlock
											language={match?.[1] ?? "text"}
											value={String(children).replace(/\n$/, "")}
										/>
									);
								},
							}}
						>
							{message.content}
						</MemoizedReactMarkdown>
					</li>
				))}
				<li ref={lastMessageRef} />
			</ul>
			<form onSubmit={handleSubmit} className="relative" ref={formRef}>
				<Textarea
					placeholder="Type a message"
					value={input}
					onChange={handleInputChange}
					className="min-h-[40px] font-mono resize-none border-0 border-t bg-foreground/5 pr-16 [&::-webkit-scrollbar-thumb]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar]:bg-foreground/5"
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							formRef.current?.requestSubmit();
						}
					}}
				/>
				<Button type="submit" size={"icon"} className="absolute right-4 top-2">
					<ArrowUp
						className={`size-5 absolute duration-300 transition ${
							isLoading
								? "translate-y-8 opacity-0 pointer-events-none"
								: "translate-y-0 opacity-100 pointer-events-auto"
						}`}
					/>
					<X
						className={`size-5 absolute duration-300 transition ${
							isLoading
								? "translate-y-0 opacity-100 pointer-events-auto"
								: "translate-y-8 opacity-0 pointer-events-none"
						}`}
					/>
				</Button>
			</form>
		</>
	);
}
