import getStorage from "@nsnanocat/util/getStorage.mjs";
import { Console, Storage, Lodash as _ } from "@nsnanocat/util";

/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {Object} $ - ENV
 * @param {String} name - Persistent Store Key
 * @param {Array} platforms - Platform Names
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
export default function setENV(name, platforms, database) {
	Console.log("☑️ Set Environment Variables");
	const argumentStorage = globalThis.$argument.Storage;
	globalThis.$argument.Storage = Storage.getItem(`@${name}.${platforms}.Settings`, {}).Storage ?? argumentStorage;
	const { Settings, Caches, Configs } = getStorage(name, platforms, database);
	globalThis.$argument.Storage = argumentStorage;
	/***************** Settings *****************/
	if (!Array.isArray(Settings?.Locales)) Settings.Locales = Settings.Locales ? [Settings.Locales] : []; // 只有一个选项时，无逗号分隔
	Console.info(`typeof Settings: ${typeof Settings}`, `Settings: ${JSON.stringify(Settings, null, 2)}`);
	/***************** Caches *****************/
	if (!Array.isArray(Caches?.ss)) Caches.ss = [];
	if (!Array.isArray(Caches?.ep)) Caches.ep = [];
	Caches.ss = new Map(Caches?.ss ?? []); // Array转Map
	Caches.ep = new Map(Caches?.ep ?? []); // Array转Map
	//Console.debug(`typeof Caches: ${typeof Caches}`, `Caches: ${JSON.stringify(Caches, null, 2)}`);
	/***************** Configs *****************/
	Console.log("✅ Set Environment Variables");
	return { Settings, Caches, Configs };
}
