import "tailwindcss/tailwind.css";
import "../styles/global.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import NextProgress from "next-progress";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useApollo } from "../graphql/client";

export default function MyApp({ Component, pageProps }: AppProps) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<ApolloProvider client={apolloClient}>
			<Head>
				<title>Pepe Emoji</title>
			</Head>

			<Navbar />
			<NextProgress color="#2ecc71" />
			<Component {...pageProps} />
			<Footer />
		</ApolloProvider>
	);
}
