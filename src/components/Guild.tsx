import Link from "next/link";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { guildIconCdn } from "../utils/cdn";
import type { Snowflake } from "../utils/constants";

interface GuildProps {
	icon: string;
	id: Snowflake;
	index: number;
	invite: string;
	memberCount: number;
	name: string;
	total: number;
}

export default function Guild({ icon, id, index, invite, memberCount, name, total }: GuildProps) {
	const { width } = useWindowDimensions();

	// Somewhat equivalent to sm
	const imgSize = typeof width === "number" && width >= 640 ? 64 : 50;

	return (
		<div
			className={`grid w-80 min-w-max gap-x-2 rounded-md bg-discord-not-quite-black px-3 py-2 grid-areas-guild sm:w-96 ${
				total - 1 === index && index % 2 === 0 ? "col-span-2" : ""
			}`}
		>
			<img
				alt={`${name} guild icon`}
				className="rounded-lg grid-in-icon"
				width={imgSize}
				height={imgSize}
				src={guildIconCdn(id, icon, 64)}
			/>

			<Link href={`https://discord.gg/${invite}`}>
				<a className="text-white grid-in-name hover:underline sm:text-lg">{name}</a>
			</Link>

			<div className="flex items-center justify-center grid-in-members">
				<p className="text-sm text-gray-400 sm:text-base">{memberCount.toLocaleString("en")} members</p>
			</div>

			<div className="flex items-center justify-self-end grid-in-join">
				<Link href={`https://discord.gg/${invite}`}>
					<a className="rounded-sm bg-discord-green px-4 py-2 text-xs text-white duration-100 hover:bg-discord-lighter-green sm:text-sm">
						Join
					</a>
				</Link>
			</div>
		</div>
	);
}
