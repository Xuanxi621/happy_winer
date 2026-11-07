export interface FilmScene {
  id: string;
  title: string;
  englishTitle: string;
  subtitle: string;
  englishSubtitle: string;
  image: string;
  location: string;
  filmStock: string;
  lens: string;
  shutter: string;
  aperture: string;
  story: string;
  quote: string;
  quoteAuthor: string;
}

export const FILM_SCENES: FilmScene[] = [
  {
    id: 'hearth-warmth',
    title: '窗内人间 · 暖灯围坐',
    englishTitle: 'Within The Window: Warmth by The Lantern',
    subtitle: '“白雪落尽檐下瓦，一盏明灯暖小家。”',
    englishSubtitle: 'Snow settles softly upon cold eaves, while inside, a lone lantern keeps the whole house warm.',
    image: '/src/assets/images/hero_dongzhi_cinematic_1794067570670.jpg',
    location: '山阴老宅 · 暮色',
    filmStock: 'Kodak Vision3 500T',
    lens: 'Leica Summilux-M 35mm f/1.4',
    shutter: '1/48s · 24fps',
    aperture: 'f/1.4',
    story: '暮色降临，寒雪初凝。窗内陶罐里滚着热气，祖母轻轻放下木筷，招呼归人入座。冬至是一年中最长的夜晚，也是最渴望相聚的时刻。',
    quote: '天时人事日相催，冬至阳生春又来。',
    quoteAuthor: '杜甫 ·《冬至》',
  },
  {
    id: 'steaming-dumplings',
    title: '热气腾腾 · 食暖岁暮',
    englishTitle: 'Simmering Steam: Flavors of The Solstice',
    subtitle: '“冬至大如年，人间小团圆。”',
    englishSubtitle: 'The solstice night is as grand as a new year, woven from small and tender reunions.',
    image: '/src/assets/images/dongzhi_dumplings_steam_1794067571889.jpg',
    location: '旧日食肆 · 晨昏交替',
    filmStock: 'Fujifilm Eterna 250D',
    lens: 'Cooke S4/i 50mm T2.0',
    shutter: '1/50s · 24fps',
    aperture: 'f/2.0',
    story: '老竹蒸笼掀开刹那，白雾如云雾般弥漫。北方的饺子皮薄馅润，南方的汤圆软糯甜香。无论南北，这一口热腾腾的暖食，都是抵御漫长寒冬最好的铠甲。',
    quote: '家家捣米做汤圆，知是明朝冬至天。',
    quoteAuthor: '阮元 ·《吴兴杂诗》',
  },
  {
    id: 'snow-courtyard',
    title: '静穆庭院 · 飞雪印灯',
    englishTitle: 'Silent Courtyard: Snow Upon The Lanterns',
    subtitle: '“阴极之至，阳气始生，日南至，日短之至。”',
    englishSubtitle: 'At the extreme of Yin, the spark of Yang awakens; the sun journeys south, marking the year’s briefest light.',
    image: '/src/assets/images/dongzhi_snow_courtyard_1794067572417.jpg',
    location: '江南青砖院落 · 戌时',
    filmStock: 'Kodak Tri-X / Vision 200T',
    lens: 'Zeiss Master Prime 28mm T1.3',
    shutter: '1/48s · 24fps',
    aperture: 'f/1.8',
    story: '庭园古松覆霜，幽深青瓦间悬着一盏昏黄的竹纸灯笼。夜色越是深沉，那一点微光便越发纯粹笃定。光影在石板路延伸，静默中蕴育着春的律动。',
    quote: '邯郸驿里逢冬至，抱膝灯前影伴身。',
    quoteAuthor: '白居易 ·《邯郸冬至夜思家》',
  },
  {
    id: 'plum-blossom',
    title: '凌寒独放 · 雪落红梅',
    englishTitle: 'Against The Frost: Crimson Blossom in Snow',
    subtitle: '“不经一番寒彻骨，怎得梅花扑鼻香。”',
    englishSubtitle: 'Without braving the biting chill of the winter solstice, how could the plum blossom yield such pure fragrance?',
    image: '/src/assets/images/dongzhi_plum_blossom_1794067571672.jpg',
    location: '西岭梅园 · 破晓',
    filmStock: 'Kodak Ektachrome 100',
    lens: 'Macro-Elmarit 60mm f/2.8',
    shutter: '1/120s · 24fps',
    aperture: 'f/2.8',
    story: '枝头残雪未消，一朵红梅已在严寒里悄然破颜。从冬至入九算起，数尽八十一瓣消寒图，便是春回大地时。它站在冬天的至深处，迎接第一缕微暖之阳。',
    quote: '梅花香自苦寒来，阳和起蛰自此始。',
    quoteAuthor: '古语 ·《警世贤文》',
  },
];

export interface SolarPentad {
  order: string;
  name: string;
  english: string;
  phenology: string;
  significance: string;
  iconName: string;
}

export const SOLAR_PENTADS: SolarPentad[] = [
  {
    order: '初候',
    name: '蚯蚓结',
    english: 'Earthworms Coil Deep',
    phenology: '冬至之日，蚯蚓感极阴之气，蜷缩曲结于冻土深处。',
    significance: '蚯蚓为阴曲阳伸之物，感知地气极寒，在泥土深层抱团休眠，蓄力待春。',
    iconName: 'Shield',
  },
  {
    order: '二候',
    name: '麋角解',
    english: 'Elk Shed Their Antlers',
    phenology: '后五日，麋感阳气萌动，骨肉俱换，角脱落。',
    significance: '古人辨麋为阴兽，鹿为阳兽。冬至一阳初生，感应天地阴衰阳起，麋角自解，象征新旧交替。',
    iconName: 'Sparkles',
  },
  {
    order: '三候',
    name: '水泉动',
    english: 'Deep Spring Waters Stir',
    phenology: '又五日，井泉水温微升，潜流渐泛活水。',
    significance: '天寒地冻之下，地底深泉先感得一阳初动，泉水已由寒冽渐转温润，暗流涌动。',
    iconName: 'Droplets',
  },
];

export interface NineStage {
  step: number;
  name: string;
  dates: string;
  rhyme: string;
  phenomenon: string;
  quote: string;
}

export const NINE_STAGES: NineStage[] = [
  {
    step: 1,
    name: '一九',
    dates: '冬至第 1 - 9 天',
    rhyme: '一九二九不出手',
    phenomenon: '寒气初盛，朔风刺骨，人们外出往往将双手缩于袖中。天地初闭塞。',
    quote: '冬至阳生春又来，草木暗中萌发。',
  },
  {
    step: 2,
    name: '二九',
    dates: '冬至第 10 - 18 天',
    rhyme: '一九二九不出手',
    phenomenon: '地气凝固，江河微结浮冰。晨起呵气成霜，万物收敛深藏。',
    quote: '夜短昼长从今日，小院柴门夜雪深。',
  },
  {
    step: 3,
    name: '三九',
    dates: '冬至第 19 - 27 天',
    rhyme: '三九四九冰上走',
    phenomenon: '一年中最寒冷之期（隆冬三九），深水成巨冰，坚如铁石，可踏足而行。',
    quote: '大雪压青松，青松挺且直。',
  },
  {
    step: 4,
    name: '四九',
    dates: '冬至第 28 - 36 天',
    rhyme: '三九四九冰上走',
    phenomenon: '严寒极致，常有暴雪封路。民间围炉取暖，温酒以待春光。',
    quote: '晚来天欲雪，能饮一杯无。',
  },
  {
    step: 5,
    name: '五九',
    dates: '冬至第 37 - 45 天',
    rhyme: '五九六九沿河看柳',
    phenomenon: '冬去春渐生，背阳之地残雪尚在，向阳之河畔柳枝皮色变青泛软。',
    quote: '不知细叶谁裁出，二月春风似剪刀。',
  },
  {
    step: 6,
    name: '六九',
    dates: '冬至第 46 - 54 天',
    rhyme: '五九六九沿河看柳',
    phenomenon: '立春已过，冰消雪融，岸柳舒黄绿新芽，微风不再刺骨。',
    quote: '春色先从柳上归，青青一抹胜芳菲。',
  },
  {
    step: 7,
    name: '七九',
    dates: '冬至第 55 - 63 天',
    rhyme: '七九河开',
    phenomenon: '河中坚冰碎裂融化，水声潺潺，流水重归灵动。',
    quote: '竹外桃花三两枝，春江水暖鸭先知。',
  },
  {
    step: 8,
    name: '八九',
    dates: '冬至第 64 - 72 天',
    rhyme: '八九燕来',
    phenomenon: '北方大雁南归，家燕筑巢于梁间，春意盎然，泥土芬芳。',
    quote: '几处早莺争暖树，谁家新燕啄春泥。',
  },
  {
    step: 9,
    name: '九九',
    dates: '冬至第 73 - 81 天',
    rhyme: '九九加一九，耕牛遍地走',
    phenomenon: '九九八十一天满，寒气尽褪，春耕大忙，满目青翠生机。',
    quote: '九尽桃花开，天下尽春风。',
  },
];

export interface FoodItem {
  id: string;
  name: string;
  category: 'north' | 'south';
  tagline: string;
  lore: string;
  fillings: string[];
  blessing: string;
}

export const WINTER_FOODS: FoodItem[] = [
  {
    id: 'dumpling',
    name: '北方 · 祛寒娇耳水饺',
    category: 'north',
    tagline: '冬至不端饺子碗，冻掉耳朵没人管',
    lore: '相传医圣张仲景辞官还乡，见百姓白雪覆体冻烂耳朵，遂以羊肉、辣椒及驱寒药材包入面皮，煮成“祛寒娇耳汤”分施乡民。后人沿袭成俗，冬至必啖饺子。',
    fillings: ['三鲜猪肉大葱', '羊肉胡萝卜香葱', '素珍松茸荠菜', '鲜虾马蹄玉米'],
    blessing: '捏一个富贵圆满，吃一碗岁岁无虞。愿你在北风呼啸的夜里，总有一碗热饺温熨风尘。',
  },
  {
    id: 'tangyuan',
    name: '南方 · 圆满如意汤圆',
    category: 'south',
    tagline: '家家捣米做汤圆，知是明朝冬至天',
    lore: '南方冬至又称“冬节”，有“吃了汤圆大一岁”的说法。以糯米粉搓制红白两色小圆子，象征阴阳调和、合家团圆，供奉祖先、馈赠亲邻。',
    fillings: ['经典流沙黑芝麻', '金桂蜜浸花生', '四明山甜水红豆', '苏式鲜肉咸香'],
    blessing: '一口甘芳软糯，一年顺遂甜美。愿你的生活如碗中汤圆，无论漂泊何方，终有安稳团圆。',
  },
];

export interface GreetingPreset {
  title: string;
  category: string;
  content: string;
  authorOrSource: string;
}

export const GREETING_PRESETS: GreetingPreset[] = [
  {
    title: '至深长夜，向阳而生',
    category: '温暖励志',
    content: '今日冬至，昼短之至，夜长之至。愿你熬过最漫长的清寒，从今往后的每一个日子，阳光都一天比一天明亮。',
    authorOrSource: '岁暮光影语',
  },
  {
    title: '冬至大如年，愿君常安',
    category: '至亲好友',
    content: '冬至大如年，人间小团圆。水饺温润，汤圆甘甜。愿远方的你天冷加衣，朝夕有炊烟，岁岁皆安康。',
    authorOrSource: '思念如故',
  },
  {
    title: '邯郸驿前，明月如故',
    category: '古典诗韵',
    content: '邯郸驿里逢冬至，抱膝灯前影伴身。想得家中夜深坐，还应说着远行人。愿孤身奋斗的行者，心有明灯，身有暖衣。',
    authorOrSource: '白居易 ·《思家》',
  },
  {
    title: '风霜尽处，静候春归',
    category: '寄语岁月',
    content: '阴极之至，阳气初生。冬天的极致，便是春天的序章。愿所有的遗憾都封存于旧雪，所有美好随春光破土。',
    authorOrSource: '节气物语',
  },
];
