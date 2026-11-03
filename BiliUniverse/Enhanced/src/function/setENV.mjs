import { Lodash as _, Console } from "@nsnanocat/util";
import getStorage from "@nsnanocat/util/getStorage.mjs";

/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {Array} platforms - Platform Names
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
export default function setENV(name, platforms, database) {
	Console.info("☑️ Set Environment Variables");
	const { Settings, Caches, Configs } = getStorage(name, platforms, database);
	/***************** Settings *****************/
	// 单值或空值转换为数组
	string2array("Home.Top");
	string2array("Home.Top_more");
	string2array("Home.Tab");
	Settings.Home.Tab = Settings.Home.Tab.map(String);
	Settings.Home.Tab_default = String(Settings.Home.Tab_default);
	string2array("Following.Tab");
	string2array("Bottom");
	string2array("Mine.Shortcuts");
	string2array("Mine.CreatorCenter");
	string2array("Mine.Recommend");
	string2array("Mine.More");
	string2array("Mine.iPad.Upper");
	string2array("Mine.iPad.Recommend");
	string2array("Mine.iPad.More");
	string2array("Region.Index");
	Console.info(`typeof Settings: ${typeof Settings}`, `Settings: ${JSON.stringify(Settings, null, 2)}`);
	/***************** Caches *****************/
	//Console.debug(`typeof Caches: ${typeof Caches}`, `Caches: ${JSON.stringify(Caches, null, 2)}`);
	/***************** Configs *****************/
	Console.info("✅ Set Environment Variables");
	return { Settings, Caches, Configs };

	function string2array(path) {
		const setting = _.get(Settings, path);
		if (!Array.isArray(setting)) _.set(Settings, path, setting ? [setting] : []);
	}
}
