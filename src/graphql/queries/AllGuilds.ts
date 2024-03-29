import { gql } from "@apollo/client";
import type { Snowflake } from "../../utils/constants";

interface Guild {
	emojiCount: number;
	icon: string;
	id: Snowflake;
	invite: string;
	memberCount: number;
	name: string;
	presenceCount: number;
}

export interface AllGuilds {
	allOfficialGuilds: Guild[];
	allOtherGuilds: Omit<Guild, "emojiCount">[];
}

export default gql`
	query {
		allOfficialGuilds {
			emojiCount
			icon
			id
			invite
			name
			memberCount
			presenceCount
		}

		allOtherGuilds {
			icon
			id
			invite
			name
			memberCount
			presenceCount
		}
	}
`;
