import { Console } from "@nsnanocat/util";

/**
 * Set Cache
 * @author VirgilClyne
 * @param {Map} cache - Playlists Cache / Subtitles Cache
 * @param {Number} cacheSize - Cache Size
 * @return {Boolean} isSaved
 */
export default function setCache(cache, cacheSize = 100) {
	Console.log("☑️ Set Cache", `cacheSize: ${cacheSize}`);
	cache = Array.from(cache || []); // Map转Array
	cache = cache.slice(-cacheSize); // 限制缓存大小
	Console.log("✅ Set Cache");
	return cache;
}
