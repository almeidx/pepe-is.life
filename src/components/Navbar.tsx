import Link from "next/link";

const links: { name: string; url: string }[] = [
	{ name: "Home", url: "/" },
	{ name: "Pepe Manager", url: "/bot" },
];

export default function Navbar() {
	return (
		<nav className="grid h-16 grid-cols-3 gap-6 bg-discord-dark sm:grid-cols-4">
			<span className="flex items-center justify-center text-center text-base font-bold uppercase text-white sm:text-xl">
				Pepe Emoji
			</span>

			<div className="col-span-2 flex w-full flex-row items-center justify-start gap-4 text-gray-400 sm:col-span-3">
				{links.map(({ name, url }, idx) => (
					<Link key={idx} href={url}>
						<a className="text-sm duration-150 hover:text-gray-300 sm:text-base">{name}</a>
					</Link>
				))}
			</div>
		</nav>
	);
}
