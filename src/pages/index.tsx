import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";
import Emoji from "../components/Emoji";
import Guild from "../components/Guild";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import { initializeApollo } from "../graphql/client";
import ALL_GUILDS, { type AllGuilds } from "../graphql/queries/AllGuilds";
import FIND_EMOJIS, { type FindEmojis } from "../graphql/queries/FindEmojis";

interface HomeProps {
	emojiCount: number;
	guilds: AllGuilds["allOfficialGuilds"];
	otherGuilds: AllGuilds["allOtherGuilds"];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const apolloClient = initializeApollo();

	const { data } = await apolloClient.query<AllGuilds>({
		query: ALL_GUILDS,
	});

	const officialGuildsClone = [...data.allOfficialGuilds];
	const otherGuildsClone = [...data.allOtherGuilds];

	return {
		props: {
			emojiCount: officialGuildsClone.reduce((a, guild) => a + guild.emojiCount, 0),
			guilds: officialGuildsClone.sort((a, b) => b.memberCount - a.memberCount),
			otherGuilds: otherGuildsClone.sort((a, b) => b.memberCount - a.memberCount),
		},
		revalidate: 300,
	};
};

export default function Home({ emojiCount, guilds, otherGuilds }: InferGetStaticPropsType<typeof getStaticProps>) {
	const [requestedEmojis, setRequestedEmojis] = useState<FindEmojis["findEmojis"]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isTimeoutRunning, setIsTimeoutRunning] = useState(false);
	const [isSearchLoading, setIsSearchLoading] = useState(false);
	const [otherRequestedEmojis, setOtherRequestedEmojis] = useState<FindEmojis["findEmojis"]>([]);
	const [otherSearchTerm, setOtherSearchTerm] = useState("");
	const [isOtherTimeoutRunning, setIsOtherTimeoutRunning] = useState(false);
	const [isOtherSearchLoading, setIsOtherSearchLoading] = useState(false);

	const cancelSearch = () => {
		setIsSearchLoading(false);
		setSearchTerm("");
		setRequestedEmojis([]);
	};

	const cancelOtherSearch = () => {
		setIsOtherSearchLoading(false);
		setOtherSearchTerm("");
		setOtherRequestedEmojis([]);
	};

	useEffect(() => {
		if (!searchTerm) {
			cancelSearch();
			return () => void 0;
		}

		setIsTimeoutRunning(true);
		const typingTimeout = setTimeout(async () => {
			setIsTimeoutRunning(false);

			if (searchTerm) {
				setRequestedEmojis([]);
				setIsSearchLoading(true);

				const apolloClient = initializeApollo();

				try {
					const { data } = await apolloClient.query<FindEmojis>({
						query: FIND_EMOJIS,
						variables: { query: searchTerm },
					});

					setIsSearchLoading(false);
					setRequestedEmojis(data.findEmojis);
				} catch {
					setIsSearchLoading(false);
					setRequestedEmojis([]);
				}
			}
		}, 750);

		return () => {
			setIsTimeoutRunning(false);
			clearTimeout(typingTimeout);
		};
	}, [searchTerm]);

	useEffect(() => {
		if (!otherSearchTerm) {
			cancelOtherSearch();
			return () => void 0;
		}

		setIsOtherTimeoutRunning(true);
		const typingTimeout = setTimeout(async () => {
			setIsOtherTimeoutRunning(false);
			if (otherSearchTerm) {
				setOtherRequestedEmojis([]);
				setIsOtherSearchLoading(true);

				const apolloClient = initializeApollo();

				try {
					const { data } = await apolloClient.query<FindEmojis>({
						query: FIND_EMOJIS,
						variables: { other: true, query: otherSearchTerm },
					});
					setIsOtherSearchLoading(false);
					setOtherRequestedEmojis(data.findEmojis);
				} catch {
					setIsOtherSearchLoading(false);
					setOtherRequestedEmojis([]);
				}
			}
		}, 750);

		return () => {
			setIsOtherTimeoutRunning(false);
			clearTimeout(typingTimeout);
		};
	}, [otherSearchTerm]);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const query = urlParams.get("q");
		if (query) setSearchTerm(decodeURIComponent(query));
	}, []);

	return (
		<div className="flex min-h-screen flex-col items-center bg-discord-dark">
			<header className="py-5 font-bold">
				<h1 className="text-2xl text-white sm:text-4xl">{emojiCount.toLocaleString("en")} unique Pepe Emojis</h1>
			</header>

			<Input
				className="my-5"
				id="searchTerm"
				maxLength={32}
				onChange={(event) => setSearchTerm(event.target.value)}
				onClear={() => cancelSearch()}
				placeholder="Search for Pepe Emojis"
				value={searchTerm}
			/>

			<section className="flex max-w-2xl flex-row flex-wrap gap-2">
				{isSearchLoading && <Spinner />}

				{requestedEmojis.length === 0
					? searchTerm && !isSearchLoading && !isTimeoutRunning && <p className="text-white">Could not find anything</p>
					: requestedEmojis.map(({ id, invite, name }) => (
							<Emoji animated={name.startsWith("a")} key={id} invite={invite} id={id} name={name} />
					  ))}
			</section>

			<h2 className="my-6 text-2xl font-bold text-white sm:text-3xl">Official Pepe Emoji servers</h2>

			<div className="flex flex-col flex-wrap gap-3 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:place-items-center">
				{guilds.map(({ icon, id, invite, memberCount, name }, idx) => (
					<Guild
						icon={icon}
						id={id}
						index={idx}
						invite={invite}
						key={idx}
						memberCount={memberCount}
						name={name}
						total={guilds.length}
					/>
				))}
			</div>

			<h2 className="my-6 text-2xl font-bold text-white sm:text-3xl">Other official Emoji servers</h2>

			<Input
				className="my-5"
				id="otherSearchTerm"
				maxLength={32}
				onChange={(event) => setOtherSearchTerm(event.target.value)}
				onClear={() => cancelOtherSearch()}
				placeholder="Search for other Emojis"
				value={otherSearchTerm}
			/>

			<section className="mb-6 flex max-w-2xl flex-row flex-wrap gap-2">
				{isOtherSearchLoading && <Spinner />}

				{otherRequestedEmojis.length === 0
					? otherSearchTerm &&
					  !isOtherSearchLoading &&
					  !isOtherTimeoutRunning && <p className="text-white">Could not find anything</p>
					: otherRequestedEmojis.map(({ id, invite, name }) => (
							<Emoji animated={name.startsWith("a")} key={id} invite={invite} id={id} name={name} />
					  ))}
			</section>

			<div className="mb-8 flex flex-col flex-wrap gap-3 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:place-items-center">
				{otherGuilds.map(({ icon, id, invite, memberCount, name }, idx) => (
					<Guild
						icon={icon}
						id={id}
						index={idx}
						invite={invite}
						key={idx}
						memberCount={memberCount}
						name={name}
						total={otherGuilds.length}
					/>
				))}
			</div>
		</div>
	);
}
