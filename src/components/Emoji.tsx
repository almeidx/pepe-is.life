import { emojiCdn } from "../utils/cdn";
import type { Snowflake } from "../utils/constants";

interface EmojiProps {
	animated: boolean;
	id: Snowflake;
	invite: string;
	name: string;
}

export default function Emoji({ animated, id, invite, name }: EmojiProps) {
	return (
		<div className="group relative h-max w-max cursor-pointer">
			<img
				width={48}
				height={48}
				src={emojiCdn(id, animated)}
				className="w-12"
				onClick={() => window.open(`https://discord.gg/${invite}`)}
			/>

			<div
				onClick={() => void navigator.clipboard.writeText(`:${name}:`)}
				className="group absolute bottom-full left-1/2 hidden -translate-x-1/2 rounded-md bg-black transition-colors active:bg-gray-800 group-hover:block"
			>
				<p className="py-1 px-1.5 text-white ">{`:${name}:`}</p>
				<div className="relative">
					<div className="absolute -top-1 left-1/2 -translate-x-1/2 rotate-45 border-4 border-black transition-colors group-active:border-gray-800" />
				</div>
			</div>
		</div>
	);
}
