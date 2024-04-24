import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "./button";

type languageMap = Record<string, string | undefined>;

export const programmingLanguages: languageMap = {
	javascript: ".js",
	python: ".py",
	java: ".java",
	c: ".c",
	cpp: ".cpp",
	"c++": ".cpp",
	"c#": ".cs",
	ruby: ".rb",
	php: ".php",
	swift: ".swift",
	"objective-c": ".m",
	kotlin: ".kt",
	typescript: ".ts",
	go: ".go",
	perl: ".pl",
	rust: ".rs",
	scala: ".scala",
	haskell: ".hs",
	lua: ".lua",
	shell: ".sh",
	sql: ".sql",
	html: ".html",
	css: ".css",
	// add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

export function CodeBlock({
	language,
	value,
}: { language: string; value: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		void navigator.clipboard.writeText(value);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<div className="relative">
			<Button
				size={"icon"}
				variant={"ghost"}
				className="top-4 right-5 absolute hover:bg-primary hover:text-background"
				onClick={handleCopy}
			>
				<Clipboard
					className={`size-5 absolute transition duration-300 ${
						copied
							? "opacity-0 pointer-event-none translate-y-8"
							: "opacity-100 translate-y-0 pointer-events-auto"
					}`}
				/>
				<Check
					className={`size-5 absolute transition duration-300 ${
						copied
							? "opacity-100 translate-y-0 pointer-events-auto"
							: "opacity-0 pointer-event-none translate-y-8"
					}`}
				/>
			</Button>
			<SyntaxHighlighter
				language={language}
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				style={monokai}
				wrapLongLines
				wrapLines
				PreTag="div"
				showLineNumbers
				customStyle={{
					margin: 0,
					width: "100%",
					maxWidth: "var(--spacement)",
					background: "hsl(var(--foreground) / 0.5)",
					padding: "1.5rem 1rem",
					borderRadius: "var(--radius)",
				}}
				lineNumberStyle={{
					userSelect: "none",
				}}
				codeTagProps={{
					style: {
						fontSize: "0.9rem",
						fontFamily: "var(--font-geist-mono)",
					},
				}}
			>
				{value}
			</SyntaxHighlighter>
		</div>
	);
}
