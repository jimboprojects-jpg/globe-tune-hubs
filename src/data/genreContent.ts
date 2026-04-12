export interface GenreContent {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  description: string;
  keywords: string[];
}

export const GENRES: GenreContent[] = [
  {
    slug: 'pop',
    name: 'Pop',
    metaTitle: 'Pop Radio Stations – Listen to Pop Music Live Online | CartoFM',
    metaDescription: 'Stream the best pop radio stations from around the world. Listen to chart-topping pop hits, new releases, and classic pop music live on CartoFM.',
    headline: 'Pop Radio Stations Worldwide',
    intro: 'Tune into live pop radio stations from every corner of the globe. From Billboard chart-toppers to international pop sensations, CartoFM brings you non-stop pop music streaming.',
    description: 'Pop music is the most listened-to genre globally, and CartoFM gives you access to hundreds of pop radio stations broadcasting live. Whether you love K-pop from South Korea, Latin pop from Colombia, or mainstream pop from the US and UK, our curated collection of pop stations keeps you connected to the hottest tracks and emerging artists worldwide.',
    keywords: ['pop radio', 'pop music online', 'listen pop live', 'pop stations'],
  },
  {
    slug: 'rock',
    name: 'Rock',
    metaTitle: 'Rock Radio Stations – Stream Live Rock Music Online | CartoFM',
    metaDescription: 'Listen to live rock radio stations worldwide. Classic rock, alternative, indie, hard rock, and metal stations streaming 24/7 on CartoFM.',
    headline: 'Rock Radio Stations Worldwide',
    intro: 'Discover live rock radio from around the world. From classic rock legends to modern indie and alternative, CartoFM connects you to the best rock stations broadcasting now.',
    description: 'Rock music has been a global phenomenon for decades, and internet radio keeps the spirit alive. CartoFM features rock stations spanning classic rock, progressive rock, punk, grunge, alternative, indie rock, and heavy metal. Whether you want to revisit the golden age of rock or discover underground bands from Berlin or Tokyo, our rock radio collection has you covered.',
    keywords: ['rock radio', 'classic rock online', 'rock music stream', 'alternative radio'],
  },
  {
    slug: 'jazz',
    name: 'Jazz',
    metaTitle: 'Jazz Radio Stations – Listen to Jazz Music Live Online | CartoFM',
    metaDescription: 'Stream live jazz radio stations from around the world. Smooth jazz, bebop, fusion, and classic jazz — listen free on CartoFM.',
    headline: 'Jazz Radio Stations Worldwide',
    intro: 'Immerse yourself in live jazz radio from across the globe. From smooth jazz to bebop, fusion to free jazz, CartoFM brings you the finest jazz stations streaming 24/7.',
    description: 'Jazz is one of America\'s greatest cultural exports, now enjoyed worldwide through internet radio. CartoFM features jazz stations from New Orleans to Tokyo, Paris to Cape Town. Whether you prefer the sophisticated sounds of smooth jazz for relaxation, the complexity of bebop, or the experimentation of avant-garde jazz, our collection offers something for every jazz enthusiast.',
    keywords: ['jazz radio', 'smooth jazz online', 'jazz music stream', 'bebop radio'],
  },
  {
    slug: 'classical',
    name: 'Classical',
    metaTitle: 'Classical Music Radio – Listen to Classical Stations Online | CartoFM',
    metaDescription: 'Stream live classical music radio stations worldwide. Orchestral, chamber music, opera, and more — listen free on CartoFM.',
    headline: 'Classical Music Radio Stations',
    intro: 'Experience the timeless beauty of classical music with live radio stations from around the world. From symphonies to sonatas, CartoFM connects you to the world\'s finest classical broadcasters.',
    description: 'Classical music radio stations offer a sanctuary of refined musical artistry. CartoFM features stations from Vienna, London, Berlin, and beyond, broadcasting orchestral masterpieces, chamber music, solo recitals, and opera. Many stations feature expert commentary and programming that deepens your appreciation of composers from Bach to contemporary classical artists.',
    keywords: ['classical radio', 'classical music online', 'orchestra radio', 'opera streaming'],
  },
  {
    slug: 'electronic',
    name: 'Electronic',
    metaTitle: 'Electronic Music Radio – EDM, House, Techno Stations | CartoFM',
    metaDescription: 'Listen to live electronic music radio. EDM, house, techno, trance, drum and bass stations streaming worldwide on CartoFM.',
    headline: 'Electronic Music Radio Stations',
    intro: 'Discover the best electronic music radio stations worldwide. From Berlin techno to Ibiza house, UK drum and bass to Detroit electro, CartoFM is your gateway to global electronic music.',
    description: 'Electronic music has transformed the global music scene, and internet radio is its natural home. CartoFM curates stations playing house, techno, trance, dubstep, drum and bass, ambient, and experimental electronic music. Tune into legendary stations from clubbing capitals like Berlin, Amsterdam, London, and Ibiza, or discover underground electronic scenes from around the world.',
    keywords: ['electronic radio', 'EDM stations', 'techno radio', 'house music online'],
  },
  {
    slug: 'hiphop',
    name: 'Hip Hop',
    metaTitle: 'Hip Hop Radio Stations – Rap & Hip Hop Music Live | CartoFM',
    metaDescription: 'Stream live hip hop and rap radio stations worldwide. Old school, trap, drill, and mainstream hip hop — listen free on CartoFM.',
    headline: 'Hip Hop Radio Stations Worldwide',
    intro: 'Tune into live hip hop radio from around the globe. From New York boom-bap to Atlanta trap, London grime to French rap, CartoFM brings you the full spectrum of hip hop culture.',
    description: 'Hip hop is a global cultural force, and CartoFM connects you to hip hop radio stations from every corner of the world. Listen to stations featuring old school classics, new school bangers, underground MCs, and everything in between. Discover hip hop scenes beyond the mainstream — from Japanese hip hop to African rap, Latin trap to UK grime.',
    keywords: ['hip hop radio', 'rap stations online', 'hip hop streaming', 'rap music live'],
  },
  {
    slug: 'country',
    name: 'Country',
    metaTitle: 'Country Music Radio – Listen to Country Stations Online | CartoFM',
    metaDescription: 'Stream live country music radio stations. Classic country, modern country, bluegrass, and Americana — listen worldwide on CartoFM.',
    headline: 'Country Music Radio Stations',
    intro: 'Listen to country music radio stations from Nashville and beyond. CartoFM brings you classic country, modern hits, bluegrass, and Americana from stations across the world.',
    description: 'Country music has deep roots in American culture and has grown into a global phenomenon. CartoFM features country radio stations playing everything from Hank Williams classics to modern country pop hits. Whether you love traditional country, outlaw country, bluegrass, or the Nashville sound, our collection of country stations delivers authentic country music 24/7.',
    keywords: ['country radio', 'country music online', 'Nashville radio', 'bluegrass stations'],
  },
  {
    slug: 'news',
    name: 'News & Talk',
    metaTitle: 'News Radio Stations – Live News & Talk Radio Online | CartoFM',
    metaDescription: 'Listen to live news and talk radio stations from around the world. Stay informed with breaking news, analysis, and discussions on CartoFM.',
    headline: 'News & Talk Radio Stations',
    intro: 'Stay informed with live news and talk radio from around the world. CartoFM connects you to breaking news, political analysis, sports talk, and cultural discussions in multiple languages.',
    description: 'News and talk radio remains one of the most important sources of information worldwide. CartoFM aggregates news radio stations from every continent, letting you hear local perspectives on global events. From BBC World Service to NPR, from Deutsche Welle to NHK World, access authoritative journalism and engaging talk shows in dozens of languages.',
    keywords: ['news radio', 'talk radio online', 'live news streaming', 'world news radio'],
  },
  {
    slug: 'rnb',
    name: 'R&B / Soul',
    metaTitle: 'R&B Radio Stations – Soul & R&B Music Live Online | CartoFM',
    metaDescription: 'Stream live R&B and soul radio stations. Classic Motown, modern R&B, neo-soul — listen to the best R&B stations on CartoFM.',
    headline: 'R&B & Soul Radio Stations',
    intro: 'Feel the groove with live R&B and soul radio stations from around the world. From classic Motown to contemporary R&B, CartoFM delivers soulful sounds 24/7.',
    description: 'R&B and soul music have shaped popular culture for over half a century. CartoFM features stations dedicated to classic soul, Motown, funk, contemporary R&B, and neo-soul. Whether you want to revisit the timeless sounds of Aretha Franklin and Marvin Gaye or discover today\'s hottest R&B artists, our stations keep the soul alive.',
    keywords: ['rnb radio', 'soul music online', 'r&b stations', 'motown radio'],
  },
  {
    slug: 'reggae',
    name: 'Reggae',
    metaTitle: 'Reggae Radio Stations – Listen to Reggae & Dancehall Live | CartoFM',
    metaDescription: 'Stream live reggae radio stations worldwide. Roots reggae, dancehall, dub, and ska — listen free on CartoFM.',
    headline: 'Reggae Radio Stations Worldwide',
    intro: 'Experience the positive vibrations of live reggae radio from Jamaica and beyond. CartoFM brings you roots reggae, dancehall, dub, and ska stations from across the globe.',
    description: 'Reggae music, born in Jamaica, has become a universal language of peace and resistance. CartoFM features reggae radio stations from Kingston to London, from Africa to the Pacific Islands. Listen to roots reggae, modern dancehall, dub, ska, and reggae fusion — the heartbeat of Caribbean culture available worldwide.',
    keywords: ['reggae radio', 'dancehall online', 'reggae music live', 'jamaican radio'],
  },
  {
    slug: 'latin',
    name: 'Latin',
    metaTitle: 'Latin Radio Stations – Salsa, Reggaeton, Bachata Live | CartoFM',
    metaDescription: 'Listen to live Latin music radio. Salsa, reggaeton, bachata, cumbia, and more — stream Latin radio stations worldwide on CartoFM.',
    headline: 'Latin Music Radio Stations',
    intro: 'Dance to the rhythms of live Latin music radio. From salsa and reggaeton to bachata, cumbia, and Latin pop, CartoFM delivers the hottest Latin radio stations worldwide.',
    description: 'Latin music is one of the fastest-growing genres globally, and CartoFM puts you at the center of this musical revolution. Listen to stations playing reggaeton, salsa, bachata, cumbia, merengue, Latin pop, and regional Mexican music. Whether you\'re in Miami, Mexico City, Bogotá, or anywhere else in the world, our Latin radio collection keeps you moving.',
    keywords: ['latin radio', 'reggaeton online', 'salsa radio', 'latin music streaming'],
  },
  {
    slug: 'ambient',
    name: 'Ambient / Chill',
    metaTitle: 'Ambient & Chill Radio – Relaxing Music Stations Online | CartoFM',
    metaDescription: 'Stream relaxing ambient and chill music radio stations. Lo-fi, downtempo, meditation music, and nature sounds — listen on CartoFM.',
    headline: 'Ambient & Chill Radio Stations',
    intro: 'Relax and unwind with ambient and chill radio stations. CartoFM offers curated stations playing lo-fi beats, downtempo, meditation music, and atmospheric soundscapes.',
    description: 'In our fast-paced world, ambient and chill music radio provides a much-needed escape. CartoFM features stations dedicated to ambient music, lo-fi hip hop, chillwave, downtempo, new age, meditation music, and nature soundscapes. Perfect for studying, working, yoga, meditation, or simply relaxing — these stations create the ideal sonic atmosphere for any moment.',
    keywords: ['ambient radio', 'chill music online', 'lofi radio', 'relaxing music stream'],
  },
];

const GENRE_MATCH_MAP: Record<string, string[]> = {
  pop: ['pop', 'top 40', 'chart', 'hits', 'top40'],
  rock: ['rock', 'metal', 'punk', 'grunge', 'alternative', 'indie'],
  jazz: ['jazz', 'swing', 'bebop', 'blues'],
  classical: ['classical', 'classic', 'orchestra', 'symphony', 'opera', 'baroque'],
  electronic: ['electronic', 'edm', 'house', 'techno', 'trance', 'dance', 'drum and bass', 'dubstep', 'dnb'],
  hiphop: ['hip hop', 'hiphop', 'hip-hop', 'rap', 'trap', 'drill', 'grime'],
  country: ['country', 'bluegrass', 'americana', 'folk'],
  news: ['news', 'talk', 'sports', 'information', 'public', 'npr'],
  rnb: ['rnb', 'r&b', 'soul', 'motown', 'funk', 'r and b'],
  reggae: ['reggae', 'dancehall', 'dub', 'ska', 'caribbean'],
  latin: ['latin', 'salsa', 'reggaeton', 'bachata', 'cumbia', 'merengue', 'tropical', 'latino', 'latina'],
  ambient: ['ambient', 'chill', 'lofi', 'lo-fi', 'relaxation', 'meditation', 'downtempo', 'new age', 'easy listening'],
};

export const matchStationToGenre = (stationGenre: string, genreSlug: string): boolean => {
  const patterns = GENRE_MATCH_MAP[genreSlug];
  if (!patterns) return false;
  const lower = stationGenre.toLowerCase();
  return patterns.some(p => lower.includes(p));
};

export const getGenreBySlug = (slug: string): GenreContent | undefined =>
  GENRES.find(g => g.slug === slug);

export const getGenreListSEO = () => ({
  title: 'Radio Stations by Genre – Browse Music Genres | CartoFM',
  description: 'Explore radio stations organized by music genre. Pop, rock, jazz, classical, electronic, hip hop, and more — stream live radio by genre on CartoFM.',
});
