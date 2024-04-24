"use client";

import { Github } from "../icons/github";
import { Button } from "./button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./tooltip";

export function GithubButton() {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant={"ghost"}
						size={"icon"}
						className="hover:bg-primary hover:text-background"
						onClick={() => {
							window.open("https://github.com/yorpex/ai", "_blank");
						}}
					>
						<Github className="size-6" />
					</Button>
				</TooltipTrigger>
				<TooltipContent side="left">
					<p>View on GitHub</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
