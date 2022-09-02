import type { Snowflake } from "./constants";

type ImageSizes = 1_024 | 2_048 | 4_096 | 16 | 32 | 64 | 128 | 256 | 512;

/**
 * Resolves a Discord guild icon CDN URL.
 *
 * @param id - id The ID of the guild.
 * @param hash - The icon hash.
 * @param size - The size for the icon.
 */
export function guildIconCdn(id: Snowflake, hash: string, size: ImageSizes): string {
	return `https://cdn.discordapp.com/icons/${id}/${hash}.${hash.startsWith("a_") ? "gif" : "webp"}?size=${size}`;
}

/**
 * Resolves a Discord emoji CDN URL.
 *
 * @param id - The ID of the emoji.
 * @param animated - Whether the emoji is animated.
 */
export function emojiCdn(id: Snowflake, animated: boolean): string {
	return `https://cdn.discordapp.com/emojis/${id}.${animated ? "gif" : "webp"}?v=1`;
}
