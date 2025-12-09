import { MenuItem, Review, Translation, GalleryItem } from './types';

export const TEXTS: Translation = {
  home: { en: "Home", ja: "ホーム" },
  menu: { en: "Menu", ja: "メニュー" },
  about: { en: "Our Story", ja: "当店について" },
  reviews: { en: "Reviews", ja: "口コミ" },
  gallery: { en: "Gallery", ja: "ギャラリー" },
  contact: { en: "Contact", ja: "お問い合わせ" },
  heroTitle: { en: "A Symphony of Spices", ja: "スパイスのシンフォニー" },
  heroSubtitle: { en: "Authentic Indian & Nepalese Soul Food in Maebashi", ja: "前橋で味わう、インドとネパールの本場のソウルフード" },
  bookTable: { en: "Reserve a Table", ja: "席を予約する" },
  viewMenu: { en: "Discover Menu", ja: "メニューを見る" },
  chefRecommends: { en: "Chef's AI Recommendation", ja: "シェフのAIおすすめ" },
  askChef: { en: "Ask our AI Concierge", ja: "AIコンシェルジュに聞く" },
  askPlaceholder: { en: "What spices do you recommend today?", ja: "今日はどんなスパイス料理がおすすめ？" },
  loading: { en: "Consulting the chef...", ja: "シェフに確認中..." },
  reviewSummary: { en: "What Our Guests Say", ja: "お客様の声" },
  analyzeReviews: { en: "Generate AI Insights", ja: "AI分析を生成" },
  address: { en: "Address", ja: "住所" },
  hours: { en: "Opening Hours", ja: "営業時間" },
  phone: { en: "Phone", ja: "電話番号" },
  sendMessage: { en: "Send Message", ja: "送信" },
  name: { en: "Name", ja: "お名前" },
  email: { en: "Email", ja: "メールアドレス" },
  message: { en: "Message", ja: "メッセージ" },
};

export const MENU_ITEMS: MenuItem[] = [
  // Sets
  {
    id: 'set-special',
    nameEn: "Special Rice Set",
    nameJa: "スペシャルご飯セット",
    descriptionEn: "The ultimate Nepalese feast. Includes Mutton Curry, Chicken Curry, Veg Curry, Potato Cumin, Salad, 2 Pickles, Dal Soup, Papad, and Dessert.",
    descriptionJa: "白ごはん、マトンカレー、チキンカレー、野菜カレー、ジャガクミン、サラダ、2種類のピックル、豆スープ、パパド、デザート。",
    price: 1390,
    category: 'sets',

    image: "/images/dal_bhat.png"
  },
  {
    id: 'set-mutton',
    nameEn: "Nepali Mutton Rice Set",
    nameJa: "ネパールマトンご飯セット",
    descriptionEn: "Authentic Dal Bhat with Mutton Curry, Veg Curry, Salad, Pickle, Dal Soup, and Dessert.",
    descriptionJa: "白ごはん、マトンカレー、野菜カレー、サラダ、ピックル、豆スープ、デザート。",
    price: 1090,
    category: 'sets',

    image: "/images/dal_bhat.png"
  },
  {
    id: 'set-chicken',
    nameEn: "Nepali Chicken Rice Set",
    nameJa: "ネパールチキンご飯セット",
    descriptionEn: "Classic Dal Bhat with Chicken Curry, Veg Curry, Salad, Pickle, Dal Soup, and Dessert.",
    descriptionJa: "白ごはん、チキンカレー、野菜カレー、サラダ、ピックル、豆スープ、デザート。",
    price: 990,
    category: 'sets',

    image: "/images/dal_bhat.png"
  },
  {
    id: 'set-maemi-a',
    nameEn: "Maemi Set A",
    nameJa: "マエミセットA",
    descriptionEn: "Choose 3 curries (Chicken, Butter, Spinach, Mutton). Includes Soup, Tandoori Chicken, Salad, Naan or Rice, Dessert.",
    descriptionJa: "3種類のカレーから選んでください（チキン・バター・ホウレン草・マトン）。日替りスープ、タンドリーチキン、サラダ、ナンorライス、デザート付。",
    price: 1450,
    category: 'sets',
    image: "/images/butter_chicken.png"
  },
  {
    id: 'set-maemi-b',
    nameEn: "Maemi Set B",
    nameJa: "マエミセットB",
    descriptionEn: "Choose 2 curries (Chicken, Butter, Spinach, Mutton). Includes Tandoori Chicken, Salad, Naan or Rice, Dessert.",
    descriptionJa: "2種類のカレーから選んでください（チキン・バター・ホウレン草・マトン）。タンドリーチキン、サラダ、ナンorライス、デザート付。",
    price: 1290,
    category: 'sets',
    image: "/images/butter_chicken.png"
  },
  {
    id: 'set-keema',
    nameEn: "Keema Curry Set",
    nameJa: "キーマカレーセット",
    descriptionEn: "Chicken mince curry set with Salad, Naan or Rice, and Dessert.",
    descriptionJa: "サラダ・ナンorライス・デザート付。",
    price: 990,
    category: 'sets',
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'set-seafood',
    nameEn: "Seafood Curry Set",
    nameJa: "シーフードカレーセット",
    descriptionEn: "Seafood curry set with Salad, Naan or Rice, and Dessert.",
    descriptionJa: "サラダ・ナンorライス・デザート付。",
    price: 890,
    category: 'sets',
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80" // Placeholder
  },
  {
    id: 'set-butter',
    nameEn: "Butter Curry Set",
    nameJa: "バターカレーセット",
    descriptionEn: "Rich Butter Curry set with Salad, Naan or Rice, and Dessert.",
    descriptionJa: "サラダ・ナンorライス・デザート付。",
    price: 990,
    category: 'sets',
    image: "/images/butter_chicken.png"
  },
  {
    id: 'set-mutton-curry',
    nameEn: "Mutton Curry Set",
    nameJa: "マトンカレーセット",
    descriptionEn: "Spicy Mutton Curry set with Salad, Naan or Rice, and Dessert.",
    descriptionJa: "サラダ・ナンorライス・デザート付。",
    price: 1090,
    category: 'sets',
    image: "/images/mutton_curry.png"
  },

  // Curries (Single)
  {
    id: 'curry-butter-chicken',
    nameEn: "Butter Chicken Curry",
    nameJa: "バターチキンカレー",
    descriptionEn: "Rich tomato gravy with butter and cream.",
    descriptionJa: "バターとクリームの濃厚なトマトベースのカレー。",
    price: 750,
    category: 'curry',
    isFeatured: true,

    image: "/images/butter_chicken.png"
  },
  {
    id: 'curry-mutton',
    nameEn: "Mutton Curry",
    nameJa: "マトンカレー",
    descriptionEn: "Tender mutton in spicy gravy.",
    descriptionJa: "スパイシーなマトンカレー。",
    price: 750,
    category: 'curry',
    isFeatured: true,

    image: "/images/mutton_curry.png"
  },
  {
    id: 'curry-spinach-paneer',
    nameEn: "Spinach Paneer",
    nameJa: "ほうれん草パニール",
    descriptionEn: "Spinach curry with cottage cheese.",
    descriptionJa: "カッテージチーズ入りほうれん草カレー。",
    price: 700,
    category: 'curry',

    image: "https://images.unsplash.com/photo-1596797038530-2c107a1a19d6?auto=format&fit=crop&w=800&q=80"
  },

  // Biryani & Rice
  {
    id: 'biryani-chicken',
    nameEn: "Chicken Biryani (M)",
    nameJa: "チキンビリヤニ M",
    descriptionEn: "Spiced aromatic rice with chicken. (Takes ~30 mins)",
    descriptionJa: "スパイス香るチキンの炊き込みご飯。（仕上がりまで約30分）",
    price: 1190,
    category: 'naan_rice',

    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'fried-rice-chicken',
    nameEn: "Chicken Fried Rice",
    nameJa: "チキンフライライス",
    descriptionEn: "Nepalese style fried rice with chicken.",
    descriptionJa: "ネパール風チキンチャーハン。",
    price: 790,
    category: 'naan_rice',
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80"
  },

  // Naan
  {
    id: 'naan-cheese',
    nameEn: "Cheese Naan",
    nameJa: "チーズナン",
    descriptionEn: "Naan stuffed with melting cheese.",
    descriptionJa: "とろけるチーズたっぷりのナン。",
    price: 650,
    category: 'naan_rice',
    isFeatured: true,
    image: "/images/cheese_naan.png"
  },
  {
    id: 'naan-garlic',
    nameEn: "Garlic Naan",
    nameJa: "ガーリックナン",
    descriptionEn: "Naan topped with aromatic garlic.",
    descriptionJa: "香ばしいガーリックをトッピングしたナン。",
    price: 390,
    category: 'naan_rice',
    image: "https://images.unsplash.com/photo-1573102524002-d663a1e2960c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'naan-plain',
    nameEn: "Plain Naan",
    nameJa: "ナン",
    descriptionEn: "Freshly baked traditional naan.",
    descriptionJa: "焼きたてのプレーンナン。",
    price: 290,
    category: 'naan_rice',
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80"
  },

  // Snacks & Sides
  {
    id: 'momo-steam',
    nameEn: "Steam MoMo",
    nameJa: "チキンギョウザ (Steam MoMo)",
    descriptionEn: "Steamed Nepalese dumplings.",
    descriptionJa: "ネパール風蒸し餃子。",
    price: 500,
    category: 'noodles_momo',
    image: "/images/momo.png"
  },
  {
    id: 'momo-soup',
    nameEn: "Soup MoMo",
    nameJa: "スープギョウザ",
    descriptionEn: "Momos served in a warm, spiced soup.",
    descriptionJa: "スパイスの効いたスープに入ったモモ。",
    price: 690,
    category: 'noodles_momo',
    image: "/images/momo.png"
  },
  {
    id: 'momo-chilly',
    nameEn: "Chilly MoMo",
    nameJa: "チリギョウザ",
    descriptionEn: "Fried momos tossed in spicy chilli sauce.",
    descriptionJa: "揚げモモをピリ辛チリソースで和えました。",
    price: 650,
    category: 'noodles_momo',

    image: "/images/momo.png"
  },
  {
    id: 'panipuri',
    nameEn: "Panipuri",
    nameJa: "パニプリ",
    descriptionEn: "Crispy hollow balls filled with spiced water and potatoes.",
    descriptionJa: "スパイスウォーターとジャガイモが入ったサクサクのボール。",
    price: 490,
    category: 'noodles_momo',
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'samosa',
    nameEn: "Samosa (1pc)",
    nameJa: "サモサ (1コ)",
    descriptionEn: "Fried pastry with savory filling.",
    descriptionJa: "スパイスで味付けしたジャガイモなどの具を包んで揚げたスナック。",
    price: 250,
    category: 'noodles_momo',
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'chowmein-chicken',
    nameEn: "Chicken ChowMein",
    nameJa: "チキンチャウミン",
    descriptionEn: "Nepalese style stir-fried noodles with chicken.",
    descriptionJa: "ネパール風チキン焼きそば。",
    price: 600,
    category: 'noodles_momo',
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'thukpa-chicken',
    nameEn: "Chicken Thukpa",
    nameJa: "チキン トゥッパ",
    descriptionEn: "Himalayan noodle soup with spices.",
    descriptionJa: "スパイスラーメン。",
    price: 890,
    category: 'noodles_momo',
    image: "https://images.unsplash.com/photo-1625242661157-e7e8d297d866?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'tandoori-chicken',
    nameEn: "Tandoori Chicken (1pc)",
    nameJa: "タンドリーチキン (1本)",
    descriptionEn: "Spiced chicken leg roasted in tandoor.",
    descriptionJa: "タンドールで焼き上げたスパイシーな骨付きチキン。",
    price: 230,
    category: 'sides',
    image: "https://images.unsplash.com/photo-1628294895950-98052523e036?auto=format&fit=crop&w=800&q=80"
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    author: "Kenji Tanaka",
    rating: 5,
    textEn: "The ambiance is stunning. The Butter Chicken is absolute perfection. Best Indian food in Maebashi!",
    textJa: "素晴らしい雰囲気。バターチキンは完璧です。前橋で一番美味しいインド料理店！",
    source: 'Google'
  },
  {
    id: '2',
    author: "Sarah Jenkins",
    rating: 5,
    textEn: "Incredible Dal Bhat! Reminds me of my trip to Nepal. The mutton was so tender.",
    textJa: "信じられないほど美味しいダルバート！ネパール旅行を思い出しました。マトンがとても柔らかかったです。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: '3',
    author: "Yuki Sato",
    rating: 4,
    textEn: "Very clean and stylish interior. The staff is super friendly and speaks good Japanese.",
    textJa: "とても清潔でスタイリッシュな店内。スタッフはとてもフレンドリーで、日本語も上手です。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: '4',
    author: "Amit Patel",
    rating: 5,
    textEn: "Authentic flavors. The spice level is just right. Highly recommend the Cheese Naan.",
    textJa: "本場の味。スパイスの加減がちょうど良い。チーズナンが特におすすめです。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    id: '5',
    author: "Emiko Suzuki",
    rating: 5,
    textEn: "A hidden gem near the station. The lunch set is great value for money.",
    textJa: "駅近くの隠れた名店。ランチセットはコストパフォーマンスが最高です。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: '6',
    author: "John Doe",
    rating: 4,
    textEn: "Great place for a quiet dinner. The curry pilaf was a pleasant surprise.",
    textJa: "静かなディナーに最適な場所。カレーピラフは嬉しい驚きでした。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    id: '7',
    author: "Rina Takahashi",
    rating: 5,
    textEn: "I love the decor! It doesn't feel like a typical curry shop. Very modern.",
    textJa: "内装が大好き！普通のカレー屋さんとは違う雰囲気。とてもモダンです。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/women/29.jpg"
  },
  {
    id: '8',
    author: "Hiroshi Yamamoto",
    rating: 5,
    textEn: "The Mutton Curry is a must-try. Not gamey at all, just delicious spices.",
    textJa: "マトンカレーは必食です。臭みが全くなく、美味しいスパイスの味だけ。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    id: '9',
    author: "Lisa Wong",
    rating: 4,
    textEn: "Good vegetarian options. The Dal was creamy and flavorful.",
    textJa: "ベジタリアンメニューも豊富。ダルはクリーミーで風味豊かでした。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: '10',
    author: "Takumi Kobayashi",
    rating: 5,
    textEn: "Friendly service and amazing food. Will definitely come back.",
    textJa: "フレンドリーなサービスと素晴らしい料理。間違いなくまた来ます。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/men/60.jpg"
  },
  {
    id: '11',
    author: "Anna Schmidt",
    rating: 5,
    textEn: "The Momo dumplings are fantastic! Spicy sauce is addictive.",
    textJa: "モモ（餃子）が最高！スパイシーなソースがやみつきになります。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    id: '12',
    author: "Masato Ito",
    rating: 4,
    textEn: "Convenient location and good parking availability nearby.",
    textJa: "便利な立地で、近くに駐車場もあって行きやすい。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/men/19.jpg"
  },
  {
    id: '13',
    author: "Elena Rodriguez",
    rating: 5,
    textEn: "Best Chai I've had in Japan. Perfectly spiced.",
    textJa: "日本で飲んだ中で一番美味しいチャイ。スパイスが完璧。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/women/55.jpg"
  },
  {
    id: '14',
    author: "Kenta Yoshida",
    rating: 5,
    textEn: "The lunch sets are huge! Very satisfied.",
    textJa: "ランチセットのボリュームがすごい！大満足です。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/men/72.jpg"
  },
  {
    id: '15',
    author: "Sophie Martin",
    rating: 4,
    textEn: "Lovely atmosphere for a date night. Quiet and romantic.",
    textJa: "デートにぴったりの素敵な雰囲気。静かでロマンチック。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/women/9.jpg"
  },
  {
    id: '16',
    author: "Daiki Nakamura",
    rating: 5,
    textEn: "Authentic Nepali taste. The Achar is homemade and delicious.",
    textJa: "本場ネパールの味。アチャールが自家製で美味しい。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/men/88.jpg"
  },
  {
    id: '17',
    author: "Jennifer Kim",
    rating: 5,
    textEn: "Everything was fresh and hot. The Naan is huge!",
    textJa: "全てが作りたてで熱々。ナンが巨大！",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    id: '18',
    author: "Taro Yamada",
    rating: 4,
    textEn: "Good spice balance. Not too hot for Japanese taste.",
    textJa: "スパイスのバランスが良い。日本人にも辛すぎない。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    id: '19',
    author: "Maria Garcia",
    rating: 5,
    textEn: "The staff remembered my order from last time. Great hospitality.",
    textJa: "スタッフが前回の注文を覚えていてくれました。素晴らしいおもてなし。",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/women/77.jpg"
  },
  {
    id: '20',
    author: "Shota Matsumoto",
    rating: 5,
    textEn: "My favorite curry spot in Gunma. Highly recommended!",
    textJa: "群馬で一番お気に入りのカレー屋さん。超おすすめ！",
    source: 'Google',
    avatar: "https://randomuser.me/api/portraits/men/50.jpg"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    src: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1080",
    alt: "Steamed Momos with Spicy Chutney",
    category: 'food'
  },
  {
    id: '2',
    src: "https://images.unsplash.com/photo-1617692855027-33b14f061079?w=1080",
    alt: "Sizzling Tandoori Chicken Platter",
    category: 'food'
  },
  {
    id: '3',
    src: "https://plus.unsplash.com/premium_photo-1670984940156-c7f833fe8397?w=1080",
    alt: "Cozy Cafe Interior",
    category: 'interior'
  },
  {
    id: '4',
    src: "https://plus.unsplash.com/premium_photo-1754258414541-5fd6f1c0a12e?w=1080",
    alt: "Chef Preparing Authentic Dishes",
    category: 'interior'
  },
  {
    id: '5',
    src: "/images/menu_cheese_naan_1764305854975.png",
    alt: "Freshly Baked Cheese Naan",
    category: 'food'
  },
  {
    id: '6',
    src: "/images/menu_butter_chicken_1764305668998.png",
    alt: "Rich Butter Chicken Curry",
    category: 'food'
  }
];