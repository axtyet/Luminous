import { RegionShortcutReq } from "@biliverse/protobuf/bilibili/app/show/v1/mixture.js";
import gRPC from "@nsnanocat/grpc";
import { $app, Storage } from "@nsnanocat/util";

/**
 * 分区响应转换器。
 * Region response transformer.
 */
export default class Region {
	/**
	 * 分区页静态配置。
	 * Region page static configuration.
	 */
	static #Config = {
		index: [
			{
				tid: 1,
				reid: 0,
				name: "动画",
				logo: "http://i0.hdslb.com/bfs/archive/9b3bb8cfc8d87809ffa409bc65def8d8c3eaf72b.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/1",
				type: 0,
				children: [
					{
						tid: 24,
						reid: 1,
						name: "MAD·AMV",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 25,
						reid: 1,
						name: "MMD·3D",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 27,
						reid: 1,
						name: "综合",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 47,
						reid: 1,
						name: "短片·手书·配音",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 210,
						reid: 1,
						name: "手办·模玩",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 86,
						reid: 1,
						name: "特摄",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 253,
						reid: 1,
						name: "动漫杂谈",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 3,
				reid: 0,
				name: "音乐",
				logo: "http://i0.hdslb.com/bfs/archive/3a99c51d00038ced3989686b6f3c49d01aa34207.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/3",
				type: 0,
				children: [
					{
						tid: 28,
						reid: 3,
						name: "原创音乐",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 29,
						reid: 3,
						name: "音乐现场",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 30,
						reid: 3,
						name: "VOCALOID·UTAU",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 31,
						reid: 3,
						name: "翻唱",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 59,
						reid: 3,
						name: "演奏",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 193,
						reid: 3,
						name: "MV",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 243,
						reid: 3,
						name: "乐评盘点",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 244,
						reid: 3,
						name: "音乐教学",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 130,
						reid: 3,
						name: "音乐综合",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 4,
				reid: 0,
				name: "游戏",
				logo: "http://i0.hdslb.com/bfs/archive/9c88ce1adaecf31e27121bdbb5a29824d655d0a6.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/4",
				type: 0,
				children: [
					{
						tid: 17,
						reid: 4,
						name: "单机游戏",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 171,
						reid: 4,
						name: "电子竞技",
						logo: "http://i0.hdslb.com/bfs/archive/0511bbb27a1f175a91bf34cfd46a8a8303e607bd.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 172,
						reid: 4,
						name: "手机游戏",
						logo: "http://i0.hdslb.com/bfs/archive/572945562c8f04437564ba37083f1c2c5ca9432b.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 65,
						reid: 4,
						name: "网络游戏",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 173,
						reid: 4,
						name: "桌游棋牌",
						logo: "http://i0.hdslb.com/bfs/archive/95acf71eacc1cf1fa542d0dcbf3480bafaa6005c.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 121,
						reid: 4,
						name: "GMV",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 136,
						reid: 4,
						name: "音游",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 19,
						reid: 4,
						name: "Mugen",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 5,
				reid: 0,
				name: "娱乐",
				logo: "http://i0.hdslb.com/bfs/archive/a9bcb4cb7e216c2ea28ba3dc10acd2d210f739bd.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/5",
				type: 0,
				children: [
					{
						tid: 71,
						reid: 5,
						name: "综艺",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 241,
						reid: 5,
						name: "娱乐杂谈",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 242,
						reid: 5,
						name: "粉丝创作",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 137,
						reid: 5,
						name: "明星综合",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 11,
				reid: 0,
				name: "电视剧",
				logo: "http://i0.hdslb.com/bfs/archive/30779a6904875754762e666b7076014528ef4834.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/cinema/tv",
				type: 0,
				is_bangumi: 1,
				children: [
					{
						tid: 185,
						reid: 11,
						name: "国产剧",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 187,
						reid: 11,
						name: "海外剧",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 11,
				reid: 0,
				name: "电视剧",
				logo: "http://i0.hdslb.com/bfs/archive/30779a6904875754762e666b7076014528ef4834.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/partition_page?page_name=tv-operation\u0026title=%E7%94%B5%E8%A7%86%E5%89%A7\u0026select_id=1",
				type: 0,
				is_bangumi: 1,
				children: [
					{
						tid: 185,
						reid: 11,
						name: "国产剧",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 187,
						reid: 11,
						name: "海外剧",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 13,
				reid: 0,
				name: "番剧",
				logo: "http://i0.hdslb.com/bfs/archive/6f629bd0dcd71d7b9911803f8e4f94fd0e5b4bfd.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/partition_page?page_name=bangumi-operation\u0026title=%E7%95%AA%E5%89%A7\u0026select_id=1",
				type: 1,
				is_bangumi: 1,
				children: [
					{
						tid: 33,
						reid: 13,
						name: "连载动画",
						logo: "http://i0.hdslb.com/bfs/archive/02c1ddbe698c4cba3c6db941047957d17b7910d7.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 32,
						reid: 13,
						name: "完结动画",
						logo: "http://i0.hdslb.com/bfs/archive/efb691127ea5b547b64431a59b27b278d6803172.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 51,
						reid: 13,
						name: "资讯",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 152,
						reid: 13,
						name: "官方延伸",
						logo: "http://i0.hdslb.com/bfs/archive/8eb0bf53223544526bf99ec6f636758e2afed503.png",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "top",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 13,
				reid: 0,
				name: "番剧",
				logo: "http://i0.hdslb.com/bfs/archive/6f629bd0dcd71d7b9911803f8e4f94fd0e5b4bfd.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/bangumi",
				type: 0,
				is_bangumi: 1,
				children: [
					{
						tid: 33,
						reid: 13,
						name: "连载动画",
						logo: "http://i0.hdslb.com/bfs/archive/02c1ddbe698c4cba3c6db941047957d17b7910d7.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 32,
						reid: 13,
						name: "完结动画",
						logo: "http://i0.hdslb.com/bfs/archive/efb691127ea5b547b64431a59b27b278d6803172.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 51,
						reid: 13,
						name: "资讯",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 152,
						reid: 13,
						name: "官方延伸",
						logo: "http://i0.hdslb.com/bfs/archive/8eb0bf53223544526bf99ec6f636758e2afed503.png",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "top",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 13,
				reid: 0,
				name: "番劇",
				logo: "http://i0.hdslb.com/bfs/archive/6f629bd0dcd71d7b9911803f8e4f94fd0e5b4bfd.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/bangumi",
				type: 1,
				is_bangumi: 1,
				config: [
					{
						scenes_name: "region",
						scenes_type: "top",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 23,
				reid: 0,
				name: "电影",
				logo: "http://i0.hdslb.com/bfs/archive/137edde9deb7dfcdf610ed2d1ec63bae6ef3ba0a.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/cinema/movie",
				type: 0,
				is_bangumi: 1,
				children: [
					{
						tid: 147,
						reid: 23,
						name: "华语电影",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 145,
						reid: 23,
						name: "欧美电影",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 146,
						reid: 23,
						name: "日本电影",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 83,
						reid: 23,
						name: "其他国家",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 36,
				reid: 0,
				name: "知识",
				logo: "http://i0.hdslb.com/bfs/archive/d5bb279936dbe661f958683231566214056987b2.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/36",
				type: 0,
				children: [
					{
						tid: 39,
						reid: 36,
						name: "演講·公開課",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 95,
						reid: 36,
						name: "數碼",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 98,
						reid: 36,
						name: "機械",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 122,
						reid: 36,
						name: "野生技能协会",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 124,
						reid: 36,
						name: "社科·法律·心理",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 201,
						reid: 36,
						name: "科学科普",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 207,
						reid: 36,
						name: "财经商业",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 208,
						reid: 36,
						name: "校园学习",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 209,
						reid: 36,
						name: "职业职场",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 228,
						reid: 36,
						name: "人文历史",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 229,
						reid: 36,
						name: "设计·创意",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 119,
				reid: 0,
				name: "鬼畜",
				logo: "http://i0.hdslb.com/bfs/archive/de50290b11c65108eb70766fa887032b948d2e4b.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/119",
				type: 0,
				children: [
					{
						tid: 22,
						reid: 119,
						name: "鬼畜调教",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 26,
						reid: 119,
						name: "音MAD",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 126,
						reid: 119,
						name: "人力VOCALOID",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 127,
						reid: 119,
						name: "教程演示",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 216,
						reid: 119,
						name: "鬼畜剧场",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 129,
				reid: 0,
				name: "舞蹈",
				logo: "http://i0.hdslb.com/bfs/archive/4769a6faa9ccfde4a029eca36b979bac486afd14.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/129",
				type: 0,
				children: [
					{
						tid: 20,
						reid: 129,
						name: "宅舞",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 154,
						reid: 129,
						name: "舞蹈综合",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 156,
						reid: 129,
						name: "舞蹈教程",
						logo: "http://i0.hdslb.com/bfs/archive/c4a42b0d7df5e4eed9fa0980445f45fff6903c5c.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 198,
						reid: 129,
						name: "街舞",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 199,
						reid: 129,
						name: "明星舞蹈",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 200,
						reid: 129,
						name: "国风舞蹈",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 255,
						reid: 129,
						name: "手势·网红舞",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 155,
				reid: 0,
				name: "时尚",
				logo: "http://i0.hdslb.com/bfs/archive/1842562be5ded346d79312b24fafedbc1d78c8e2.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/155",
				type: 0,
				children: [
					{
						tid: 157,
						reid: 155,
						name: "美妆护肤",
						logo: "http://i0.hdslb.com/bfs/archive/3f6d8cc081e5dd413eda83527b5ca91fa51f5891.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 158,
						reid: 155,
						name: "穿搭",
						logo: "http://i0.hdslb.com/bfs/archive/5df77c1b13f20af22ec9f595f6a83f8b65d469a0.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 159,
						reid: 155,
						name: "时尚潮流",
						logo: "http://i0.hdslb.com/bfs/archive/5d5767ed736a2808e7bf9e74a58f1eb5eea963cd.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 164,
						reid: 155,
						name: "健身",
						logo: "http://i0.hdslb.com/bfs/archive/c5da2d170056227118594ab2c70d40ad9d0eed5c.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 252,
						reid: 155,
						name: "仿妆cos",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 160,
				reid: 0,
				name: "生活",
				logo: "http://i0.hdslb.com/bfs/archive/50731fc4b9ec487ef2e3861a97e0eb4671b7bcef.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/160",
				type: 0,
				children: [
					{
						tid: 21,
						reid: 160,
						name: "日常",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 75,
						reid: 160,
						name: "動物圈",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 76,
						reid: 160,
						name: "美食圈",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 138,
						reid: 160,
						name: "搞笑",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 161,
						reid: 160,
						name: "手工",
						logo: "http://i0.hdslb.com/bfs/archive/f87bb34913e8f7eeef216aba813961c47117e783.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 162,
						reid: 160,
						name: "绘画",
						logo: "http://i0.hdslb.com/bfs/archive/e6b66a76eb07f2acffd00b8f8c1cc0ff57e75e53.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 163,
						reid: 160,
						name: "運動",
						logo: "http://i0.hdslb.com/bfs/archive/e6b66a76eb07f2acffd00b8f8c1cc0ff57e75e53.png",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 250,
						reid: 160,
						name: "出行",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 251,
						reid: 160,
						name: "三农",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 239,
						reid: 160,
						name: "家居房产",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 254,
						reid: 160,
						name: "亲子",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 167,
				reid: 0,
				name: "国创",
				logo: "http://i0.hdslb.com/bfs/archive/1586ec926eac1ea876cb74d32df51394d8e72341.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/partition_page?page_name=gc-operation\u0026title=%E5%9B%BD%E5%88%9B\u0026select_id=1",
				type: 1,
				is_bangumi: 1,
				children: [
					{
						tid: 153,
						reid: 167,
						name: "国产动画",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 168,
						reid: 167,
						name: "国产原创相关",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 169,
						reid: 167,
						name: "布袋戏",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 195,
						reid: 167,
						name: "动态漫·广播剧",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 170,
						reid: 167,
						name: "资讯",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "top",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 167,
				reid: 0,
				name: "国创",
				logo: "http://i0.hdslb.com/bfs/archive/1586ec926eac1ea876cb74d32df51394d8e72341.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/domestic",
				type: 0,
				is_bangumi: 1,
				children: [
					{
						tid: 153,
						reid: 167,
						name: "国产动画",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 168,
						reid: 167,
						name: "国产原创相关",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 169,
						reid: 167,
						name: "布袋戏",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 195,
						reid: 167,
						name: "动态漫·广播剧",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 170,
						reid: 167,
						name: "资讯",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "top",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 167,
				reid: 0,
				name: "國創",
				logo: "http://i0.hdslb.com/bfs/archive/1586ec926eac1ea876cb74d32df51394d8e72341.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/domestic",
				type: 1,
				is_bangumi: 1,
				config: [
					{
						scenes_name: "region",
						scenes_type: "top",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 177,
				reid: 0,
				name: "纪录片",
				logo: "http://i0.hdslb.com/bfs/archive/884a644c6bb4b8bb16f9746ef35fbaba396e0b8c.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/partition_page?page_name=documentary-operation\u0026title=%E7%BA%AA%E5%BD%95%E7%89%87\u0026select_id=1",
				type: 1,
				children: [
					{
						tid: 37,
						reid: 177,
						name: "人文·历史",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 178,
						reid: 177,
						name: "科学·探索·自然",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 179,
						reid: 177,
						name: "军事",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 180,
						reid: 177,
						name: "社会·美食·旅行",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "top",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 177,
				reid: 0,
				name: "纪录片",
				logo: "http://i0.hdslb.com/bfs/archive/884a644c6bb4b8bb16f9746ef35fbaba396e0b8c.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/cinema/doc",
				type: 0,
				children: [
					{
						tid: 37,
						reid: 177,
						name: "人文·历史",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 178,
						reid: 177,
						name: "科学·探索·自然",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 179,
						reid: 177,
						name: "军事",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 180,
						reid: 177,
						name: "社会·美食·旅行",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
					{
						scenes_name: "region",
						scenes_type: "top",
					},
				],
			},
			{
				tid: 181,
				reid: 0,
				name: "影视",
				logo: "http://i0.hdslb.com/bfs/archive/f90bb1ef59630ad9765486c6088a4944b96e88a3.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/181",
				type: 0,
				children: [
					{
						tid: 182,
						reid: 181,
						name: "影视杂谈",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 183,
						reid: 181,
						name: "影视剪辑",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 85,
						reid: 181,
						name: "小剧场",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 184,
						reid: 181,
						name: "预告·资讯",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 188,
				reid: 0,
				name: "科技",
				logo: "http://i0.hdslb.com/bfs/feed-admin/4a687a86b49feea68d423fd1bf2c461acfe59b70.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/188",
				type: 0,
				children: [
					{
						tid: 95,
						reid: 188,
						name: "数码",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 230,
						reid: 188,
						name: "软件应用",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 231,
						reid: 188,
						name: "计算机技术",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 232,
						reid: 188,
						name: "科工机械",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 233,
						reid: 188,
						name: "极客DIY",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
					{
						scenes_name: "attention",
					},
				],
			},
			{
				tid: 202,
				reid: 0,
				name: "资讯",
				logo: "https://i0.hdslb.com/bfs/legacy/d71e70e1bfcb7b27ffe88e6cb82868c68b084464.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/202",
				type: 0,
				children: [
					{
						tid: 203,
						reid: 202,
						name: "热点",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 204,
						reid: 202,
						name: "环球",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 205,
						reid: 202,
						name: "社会",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 206,
						reid: 202,
						name: "综合",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
					{
						scenes_name: "attention",
					},
				],
			},
			{
				tid: 211,
				reid: 0,
				name: "美食",
				logo: "http://i0.hdslb.com/bfs/feed-admin/0f5e21f08616f9c02d706433ba1c00bd5b889c7b.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/211",
				type: 0,
				children: [
					{
						tid: 76,
						reid: 211,
						name: "美食制作",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 212,
						reid: 211,
						name: "美食侦探",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 213,
						reid: 211,
						name: "美食测评",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 214,
						reid: 211,
						name: "田园美食",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 215,
						reid: 211,
						name: "美食记录",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 217,
				reid: 0,
				name: "动物圈",
				logo: "http://i0.hdslb.com/bfs/feed-admin/9f3303b20e12ac874c379da09bca9ce4d0b2f88c.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/217",
				type: 0,
				children: [
					{
						tid: 218,
						reid: 217,
						name: "喵星人",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 219,
						reid: 217,
						name: "汪星人",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 222,
						reid: 217,
						name: "小宠异宠",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 221,
						reid: 217,
						name: "野生动物",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 220,
						reid: 217,
						name: "动物二创",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 75,
						reid: 217,
						name: "动物综合",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 223,
				reid: 0,
				name: "汽车",
				logo: "http://i0.hdslb.com/bfs/feed-admin/1515d944550494abf81b552a84484dce80287242.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/223",
				type: 0,
				children: [
					{
						tid: 245,
						reid: 223,
						name: "赛车",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 246,
						reid: 223,
						name: "改装玩车",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 247,
						reid: 223,
						name: "新能源车",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 248,
						reid: 223,
						name: "房车",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 240,
						reid: 223,
						name: "摩托车",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 227,
						reid: 223,
						name: "购车攻略",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 176,
						reid: 223,
						name: "汽车生活",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 234,
				reid: 0,
				name: "运动",
				logo: "http://i0.hdslb.com/bfs/feed-admin/56a67fa38d8d7378ab4154307d26cffce2d1ae3f.png",
				goto: "0",
				param: "",
				uri: "bilibili://region/234",
				type: 0,
				children: [
					{
						tid: 235,
						reid: 234,
						name: "篮球",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 249,
						reid: 234,
						name: "足球",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 164,
						reid: 234,
						name: "健身",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 236,
						reid: 234,
						name: "竞技体育",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 237,
						reid: 234,
						name: "运动文化",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
					{
						tid: 238,
						reid: 234,
						name: "运动综合",
						logo: "",
						goto: "0",
						param: "",
						type: 0,
					},
				],
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "rank",
					},
					{
						scenes_name: "search",
					},
					{
						scenes_name: "tag",
					},
				],
			},
			{
				tid: 65537,
				reid: 0,
				name: "直播",
				logo: "http://i0.hdslb.com/bfs/archive/1b0ac7eafd51b03a0dc5b2390eec2fbffb25adf7.png",
				goto: "0",
				param: "",
				uri: "bilibili://home/?tab=直播",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65539,
				reid: 0,
				name: "游戏中心",
				logo: "http://i0.hdslb.com/bfs/archive/656df3124c81dd0e19bdc0a3e017091268b3db73.jpg",
				goto: "0",
				param: "",
				uri: "bilibili://game_center",
				type: 1,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65541,
				reid: 0,
				name: "专栏",
				logo: "http://i0.hdslb.com/bfs/archive/a0c0e133644c47d6263cf24cf8364e2106c102c3.png",
				goto: "0",
				param: "",
				uri: "bilibili://article/category/",
				type: 1,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
					{
						scenes_name: "search",
					},
				],
			},
			{
				tid: 65541,
				reid: 0,
				name: "专栏",
				logo: "http://i0.hdslb.com/bfs/archive/a0c0e133644c47d6263cf24cf8364e2106c102c3.png",
				goto: "0",
				param: "",
				uri: "bilibili://article/category/",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "top",
					},
				],
			},
			{
				tid: 65545,
				reid: 0,
				name: "放映厅",
				logo: "http://i0.hdslb.com/bfs/archive/3dfba664353bb2349917eaf81b60db34b2d4c61a.png",
				goto: "0",
				param: "",
				uri: "bilibili://pgc/cinema",
				type: 1,
				config: [
					{
						scenes_name: "region",
						scenes_type: "top",
					},
				],
			},
			{
				tid: 65549,
				reid: 0,
				name: "工房集市",
				logo: "http://i0.hdslb.com/bfs/feed-admin/d89a76f987820ffa3c7d5c62789ebd784c68ac07.png",
				goto: "0",
				param: "",
				uri: "https://mall.bilibili.com/neul-next/index.html?page=mall-up_market\u0026noTitleBar=1\u0026msource=js_subarea",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65550,
				reid: 0,
				name: "游戏赛事",
				logo: "http://i0.hdslb.com/bfs/archive/a93687a7f29da88ee375109389b0634412847bd1.png",
				goto: "0",
				param: "",
				uri: "https://www.bilibili.com/h5/match/data/home?navhide=1",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65550,
				reid: 0,
				name: "遊戲賽事",
				logo: "http://i0.hdslb.com/bfs/archive/a93687a7f29da88ee375109389b0634412847bd1.png",
				goto: "0",
				param: "",
				uri: "https://www.bilibili.com/h5/game/home?navhide=1",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65551,
				reid: 0,
				name: "小黑屋",
				logo: "http://i0.hdslb.com/bfs/archive/ed4f676e8c1f1029b8e37e2f567875b682e632ce.png",
				goto: "0",
				param: "",
				uri: "https://www.bilibili.com/blackroom",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65552,
				reid: 0,
				name: "全区排行榜",
				logo: "http://i0.hdslb.com/bfs/archive/34f46c749054b1c3c157b0c1c09a5ef2b3539204.png",
				goto: "0",
				param: "",
				uri: "bilibili://rank/",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65553,
				reid: 0,
				name: "活动中心",
				logo: "http://i0.hdslb.com/bfs/archive/3e2e6d338aa8156dc6f63c5dc8c75ed298c5cc9a.png",
				goto: "0",
				param: "",
				uri: "bilibili://activity_center/",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65555,
				reid: 0,
				name: "漫画",
				logo: "http://i0.hdslb.com/bfs/archive/d260e72fb98251dabe4f64858f65cc697a71587e.png",
				goto: "0",
				param: "",
				uri: "bilibili://comic/home?from=manga_channel",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65555,
				reid: 0,
				name: "漫画",
				logo: "http://i0.hdslb.com/bfs/archive/d260e72fb98251dabe4f64858f65cc697a71587e.png",
				goto: "0",
				param: "",
				uri: "bilibili://comic/home?from=ipadmanga_channel",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65556,
				reid: 0,
				name: "原創排行榜",
				logo: "http://i0.hdslb.com/bfs/archive/5f232dbcb590e81dbd3dab6d2c906cff70547841.png",
				goto: "0",
				param: "",
				uri: "bilibili://rank?type=original",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65557,
				reid: 0,
				name: "公开课",
				logo: "http://i0.hdslb.com/bfs/feed-admin/99366a6ea47d7790f57699112bc1d0c6d5f0d302.png",
				goto: "0",
				param: "",
				uri: "https://www.bilibili.com/h5/mooc?navhide=1",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65559,
				reid: 0,
				name: "VLOG",
				logo: "http://i0.hdslb.com/bfs/archive/c794e8220a8cbe3d83b83e76e753c57df67b036a.png",
				goto: "0",
				param: "",
				uri: "https://www.bilibili.com/h5/vlog?from=2",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65560,
				reid: 0,
				name: "课堂",
				logo: "http://i0.hdslb.com/bfs/archive/7400e63e28ab9933a3fa8adb3bd63e3a20911641.png",
				goto: "0",
				param: "",
				uri: "https://m.bilibili.com/cheese/home?navhide=1",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65561,
				reid: 0,
				name: "专题中心",
				logo: "http://i0.hdslb.com/bfs/archive/5c15009ace7f8bbb22c5b46cee3995525bbd9ed0.png",
				goto: "0",
				param: "",
				uri: "bilibili://topic/",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 65563,
				reid: 0,
				name: "新歌热榜",
				logo: "http://i0.hdslb.com/bfs/archive/518ba4a46b8ca94c0f29397e09acb345020fb867.png",
				goto: "0",
				param: "",
				uri: "https://www.bilibili.com/h5/musicplus?navhide=1",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
		],
		modify: [
			{
				tid: 6544,
				reid: 0,
				name: "番劇(港澳台)",
				logo: "http://i0.hdslb.com/bfs/archive/6f629bd0dcd71d7b9911803f8e4f94fd0e5b4bfd.png",
				goto: "0",
				param: "",
				uri: "bilibili://following/home_bottom_tab_activity_tab/6544",
				type: 0,
				is_bangumi: 1,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 95636,
				reid: 0,
				name: "韩综(港澳台)",
				logo: "http://i0.hdslb.com/bfs/archive/a9bcb4cb7e216c2ea28ba3dc10acd2d210f739bd.png",
				goto: "0",
				param: "",
				uri: "bilibili://following/home_bottom_tab_activity_tab/95636",
				type: 0,
				is_bangumi: 1,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
			{
				tid: 168312,
				reid: 0,
				name: "節目(港澳台)",
				logo: "http://i0.hdslb.com/bfs/archive/f90bb1ef59630ad9765486c6088a4944b96e88a3.png",
				goto: "0",
				param: "",
				uri: "bilibili://following/home_bottom_tab_activity_tab/168312",
				type: 0,
				config: [
					{
						scenes_name: "region",
						scenes_type: "bottom",
					},
				],
			},
		],
	};

	/**
	 * 保存客户端提交的自定义快捷访问。
	 * Save client-submitted custom shortcuts.
	 * @param {object} request - 原始请求 / Original request.
	 * @param {object} settings - 模块设置 / Module settings.
	 * @returns {void} 无返回值 / No return value.
	 */
	static saveShortcuts(request, settings) {
		const rawBody = $app === "Quantumult X" ? new Uint8Array(request.bodyBytes ?? []) : (request.body ?? new Uint8Array());
		settings.Home.Tab = RegionShortcutReq.fromBinary(gRPC.decode(rawBody)).uniqueId;
		Storage.setItem("@Biliverse.Enhanced.Settings", settings);
	}

	/**
	 * 合并线上与本地分区列表。
	 * Merge online and local region lists.
	 * @param {Array<object>} onlineContents - 线上分区列表 / Online region list.
	 * @param {object} localRegionList - 本地分区配置 / Local region configuration.
	 * @returns {Array<object>} 合并后的分区列表 / Merged region list.
	 */
	static mergeLists(onlineContents, localRegionList) {
		const contents = onlineContents.map(content => ({ ...content, icons: [...content.icons] }));
		const groups = new Map(contents.map(content => [content.title, content]));
		const uniqueIds = new Set(contents.flatMap(content => content.icons.map(icon => icon.uniqueId)));
		for (const group of localRegionList.groups) {
			const content = groups.get(group.title) ?? { title: group.title, icons: [] };
			for (const uniqueId of group.ids) {
				if (uniqueIds.has(uniqueId)) continue;
				const item = localRegionList.items[uniqueId];
				content.icons.push({ img: item.img, title: item.title, url: item.url, uniqueId, rid: item.rid });
				uniqueIds.add(uniqueId);
			}
			groups.set(group.title, content);
		}
		const configuredTitles = new Set(localRegionList.groups.map(group => group.title));
		return [...localRegionList.groups.map(group => groups.get(group.title)), ...contents.filter(content => !configuredTitles.has(content.title))];
	}

	/**
	 * 构造自定义快捷访问图标。
	 * Build custom shortcut icons.
	 * @param {string[]} uniqueIds - 分区唯一标识列表 / Region unique identifier list.
	 * @param {object} regionList - 分区配置 / Region configuration.
	 * @returns {Array<object>} 快捷访问图标 / Shortcut icons.
	 */
	static buildShortcutIcons(uniqueIds, regionList) {
		return uniqueIds
			.map(uniqueId => {
				const item = regionList.items[uniqueId];
				if (!item) return;
				return { img: item.img, title: item.title, url: item.url, uniqueId, rid: item.rid };
			})
			.filter(Boolean);
	}

	/**
	 * 用配置替换分区页索引。
	 * Replace region page index with configuration.
	 * @param {Array<object>} data - 分区页索引 / Region page index.
	 * @param {string} pathname - 请求路径 / Request pathname.
	 * @param {object} settings - 分区设置 / Region settings.
	 * @returns {Array<object>} 替换后的分区页索引 / Replaced region page index.
	 */
	static replaceIndex(data, pathname, settings) {
		// 分区页面索引。
		// Region page index.
		// 末尾插入全部分区。
		// Append all regions at the end.
		data.push(...Region.#Config.index.map(item => ({ ...item })), ...Region.#Config.modify.map(item => ({ ...item })));
		// 数组去重。
		// Deduplicate the array.
		const uniqueItems = new Map();
		data = data.filter(item => !uniqueItems.has(item.tid) && uniqueItems.set(item.tid, 1));
		// 排序。
		// Sort.
		data = data.sort((first, second) => first.tid - second.tid);
		// 过滤。
		// Filter.
		data = data.filter(item => settings.Index.includes(item.tid));
		// 特殊处理。
		// Special handling.
		switch (pathname) {
			case "/x/v2/region/index":
				break;
			case "/x/v2/channel/region/list":
				data = data.map(item => {
					if (item.goto === "0") item.goto = "";
					item.children = undefined;
					item.config = undefined;
					return item;
				});
				break;
		}
		return data;
	}
}
