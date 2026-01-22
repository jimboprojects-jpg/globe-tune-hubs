export interface RadioStation {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city: string;
  genre: string;
  streamUrl: string;
  latitude: number;
  longitude: number;
  language?: string;
}

// Curated list of working radio stations from around the world
export const radioStations: RadioStation[] = [
  // North America
  {
    id: "kexp-seattle",
    name: "KEXP 90.3 FM",
    country: "United States",
    countryCode: "US",
    city: "Seattle",
    genre: "Indie / Alternative",
    streamUrl: "https://kexp-mp3-128.streamguys1.com/kexp128.mp3",
    latitude: 47.6062,
    longitude: -122.3321,
    language: "English"
  },
  {
    id: "wnyc-newyork",
    name: "WNYC FM",
    country: "United States",
    countryCode: "US",
    city: "New York",
    genre: "Public Radio",
    streamUrl: "https://fm939.wnyc.org/wnycfm",
    latitude: 40.7128,
    longitude: -74.0060,
    language: "English"
  },
  {
    id: "kcrw-losangeles",
    name: "KCRW 89.9",
    country: "United States",
    countryCode: "US",
    city: "Los Angeles",
    genre: "Eclectic",
    streamUrl: "https://kcrw.streamguys1.com/kcrw_192k_mp3_e24",
    latitude: 34.0522,
    longitude: -118.2437,
    language: "English"
  },
  {
    id: "cbc-toronto",
    name: "CBC Radio One",
    country: "Canada",
    countryCode: "CA",
    city: "Toronto",
    genre: "Public Radio",
    streamUrl: "https://cbcliveradio-lh.akamaihd.net/i/CBCR1_TOR@118420/master.m3u8",
    latitude: 43.6532,
    longitude: -79.3832,
    language: "English"
  },
  {
    id: "wxrt-chicago",
    name: "WXRT 93.1",
    country: "United States",
    countryCode: "US",
    city: "Chicago",
    genre: "Rock",
    streamUrl: "https://stream.revma.ihrhls.com/zc1465",
    latitude: 41.8781,
    longitude: -87.6298,
    language: "English"
  },
  
  // Europe
  {
    id: "bbc-radio1",
    name: "BBC Radio 1",
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    genre: "Pop / Dance",
    streamUrl: "http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one",
    latitude: 51.5074,
    longitude: -0.1278,
    language: "English"
  },
  {
    id: "fip-paris",
    name: "FIP Radio",
    country: "France",
    countryCode: "FR",
    city: "Paris",
    genre: "Eclectic / Jazz",
    streamUrl: "https://icecast.radiofrance.fr/fip-midfi.mp3",
    latitude: 48.8566,
    longitude: 2.3522,
    language: "French"
  },
  {
    id: "nts-london",
    name: "NTS Radio",
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    genre: "Underground / Electronic",
    streamUrl: "https://stream-relay-geo.ntslive.net/stream",
    latitude: 51.5155,
    longitude: -0.0922,
    language: "English"
  },
  {
    id: "radio3-spain",
    name: "Radio 3 RNE",
    country: "Spain",
    countryCode: "ES",
    city: "Madrid",
    genre: "Alternative / Indie",
    streamUrl: "https://rtvelivestream.akamaized.net/rne_r3_main.mp3",
    latitude: 40.4168,
    longitude: -3.7038,
    language: "Spanish"
  },
  {
    id: "radio-paradise",
    name: "Radio Paradise",
    country: "United States",
    countryCode: "US",
    city: "Paradise",
    genre: "Eclectic",
    streamUrl: "https://stream.radioparadise.com/aac-320",
    latitude: 39.7596,
    longitude: -121.6219,
    language: "English"
  },
  {
    id: "bayern3-munich",
    name: "Bayern 3",
    country: "Germany",
    countryCode: "DE",
    city: "Munich",
    genre: "Pop / Hits",
    streamUrl: "https://dispatcher.rndfnk.com/br/br3/live/mp3/mid",
    latitude: 48.1351,
    longitude: 11.5820,
    language: "German"
  },
  {
    id: "rai-radio2",
    name: "RAI Radio 2",
    country: "Italy",
    countryCode: "IT",
    city: "Rome",
    genre: "Pop / Music",
    streamUrl: "https://icestreaming.rai.it/2.mp3",
    latitude: 41.9028,
    longitude: 12.4964,
    language: "Italian"
  },
  {
    id: "radio-nova-dublin",
    name: "Radio Nova",
    country: "Ireland",
    countryCode: "IE",
    city: "Dublin",
    genre: "Classic Rock",
    streamUrl: "https://stream.radionova.ie/nova128.mp3",
    latitude: 53.3498,
    longitude: -6.2603,
    language: "English"
  },
  {
    id: "studio-brussel",
    name: "Studio Brussel",
    country: "Belgium",
    countryCode: "BE",
    city: "Brussels",
    genre: "Alternative",
    streamUrl: "https://progressive-audio.lwc.vrtcdn.be/content/fixed/11_11niws-snip_hi.mp3",
    latitude: 50.8503,
    longitude: 4.3517,
    language: "Dutch"
  },
  {
    id: "3fm-amsterdam",
    name: "NPO 3FM",
    country: "Netherlands",
    countryCode: "NL",
    city: "Amsterdam",
    genre: "Pop / Alternative",
    streamUrl: "https://icecast.omroep.nl/3fm-bb-mp3",
    latitude: 52.3676,
    longitude: 4.9041,
    language: "Dutch"
  },
  
  // Asia
  {
    id: "j-wave-tokyo",
    name: "J-WAVE 81.3 FM",
    country: "Japan",
    countryCode: "JP",
    city: "Tokyo",
    genre: "Contemporary",
    streamUrl: "https://musicbird.leanstream.co/JCB070-MP3",
    latitude: 35.6762,
    longitude: 139.6503,
    language: "Japanese"
  },
  {
    id: "kbs-seoul",
    name: "KBS Cool FM",
    country: "South Korea",
    countryCode: "KR",
    city: "Seoul",
    genre: "K-Pop / Pop",
    streamUrl: "https://kong.kbs.co.kr/listen/radio89/radio89.m3u8",
    latitude: 37.5665,
    longitude: 126.9780,
    language: "Korean"
  },
  {
    id: "radio-mirchi-mumbai",
    name: "Radio Mirchi",
    country: "India",
    countryCode: "IN",
    city: "Mumbai",
    genre: "Bollywood / Pop",
    streamUrl: "https://radioindia.net/radio/mirchi98/icecast.audio",
    latitude: 19.0760,
    longitude: 72.8777,
    language: "Hindi"
  },
  {
    id: "hit-fm-beijing",
    name: "Hit FM Beijing",
    country: "China",
    countryCode: "CN",
    city: "Beijing",
    genre: "Pop / Hits",
    streamUrl: "http://lhttp.qingting.fm/live/339/64k.mp3",
    latitude: 39.9042,
    longitude: 116.4074,
    language: "Chinese"
  },
  {
    id: "rtm-kualalumpur",
    name: "RTM Traxx FM",
    country: "Malaysia",
    countryCode: "MY",
    city: "Kuala Lumpur",
    genre: "Contemporary",
    streamUrl: "https://liveradio-rtm.rtm.gov.my/live-traxx-radio.mp3",
    latitude: 3.1390,
    longitude: 101.6869,
    language: "Malay"
  },
  {
    id: "yes-fm-manila",
    name: "Yes FM Manila",
    country: "Philippines",
    countryCode: "PH",
    city: "Manila",
    genre: "OPM / Pop",
    streamUrl: "https://stream.radiojar.com/yesfm",
    latitude: 14.5995,
    longitude: 120.9842,
    language: "Filipino"
  },
  
  // South America
  {
    id: "radio-globo-riodejaneiro",
    name: "Rádio Globo",
    country: "Brazil",
    countryCode: "BR",
    city: "Rio de Janeiro",
    genre: "Pop / Brazilian",
    streamUrl: "https://medias.sgr.globo.com/hls/aG98YPzR/radiogloborj/manifest.m3u8",
    latitude: -22.9068,
    longitude: -43.1729,
    language: "Portuguese"
  },
  {
    id: "vorterix-buenosaires",
    name: "Vorterix Rock",
    country: "Argentina",
    countryCode: "AR",
    city: "Buenos Aires",
    genre: "Rock",
    streamUrl: "https://mp3.metastreaming.net/vorterix-low.mp3",
    latitude: -34.6037,
    longitude: -58.3816,
    language: "Spanish"
  },
  {
    id: "radio-uno-bogota",
    name: "Radio Uno",
    country: "Colombia",
    countryCode: "CO",
    city: "Bogotá",
    genre: "Pop / Latin",
    streamUrl: "https://radios.colombiadigital.net/radiouno",
    latitude: 4.7110,
    longitude: -74.0721,
    language: "Spanish"
  },
  {
    id: "radio-cooperativa-santiago",
    name: "Radio Cooperativa",
    country: "Chile",
    countryCode: "CL",
    city: "Santiago",
    genre: "News / Talk",
    streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/COOPERATIVA_SC",
    latitude: -33.4489,
    longitude: -70.6693,
    language: "Spanish"
  },
  
  // Africa
  {
    id: "metro-fm-johannesburg",
    name: "Metro FM",
    country: "South Africa",
    countryCode: "ZA",
    city: "Johannesburg",
    genre: "Urban / R&B",
    streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/METRO_FM",
    latitude: -26.2041,
    longitude: 28.0473,
    language: "English"
  },
  {
    id: "nile-fm-cairo",
    name: "Nile FM",
    country: "Egypt",
    countryCode: "EG",
    city: "Cairo",
    genre: "Contemporary",
    streamUrl: "https://nrj.hostlagarto.com/nrj",
    latitude: 30.0444,
    longitude: 31.2357,
    language: "Arabic"
  },
  {
    id: "capital-fm-nairobi",
    name: "Capital FM",
    country: "Kenya",
    countryCode: "KE",
    city: "Nairobi",
    genre: "Pop / Hits",
    streamUrl: "https://stream.capital.co.ke/capital128.mp3",
    latitude: -1.2921,
    longitude: 36.8219,
    language: "English"
  },
  {
    id: "hit-radio-casablanca",
    name: "Hit Radio",
    country: "Morocco",
    countryCode: "MA",
    city: "Casablanca",
    genre: "Pop / Urban",
    streamUrl: "https://hitradio-maroc.ice.infomaniak.ch/hitradio-maroc-128.mp3",
    latitude: 33.5731,
    longitude: -7.5898,
    language: "Arabic"
  },
  
  // Oceania
  {
    id: "triple-j-sydney",
    name: "Triple J",
    country: "Australia",
    countryCode: "AU",
    city: "Sydney",
    genre: "Alternative / Indie",
    streamUrl: "http://live-radio01.mediahubaustralia.com/2TJW/mp3/",
    latitude: -33.8688,
    longitude: 151.2093,
    language: "English"
  },
  {
    id: "rnz-national",
    name: "RNZ National",
    country: "New Zealand",
    countryCode: "NZ",
    city: "Wellington",
    genre: "Public Radio",
    streamUrl: "https://radionz-national.streamguys1.com/national-128.mp3",
    latitude: -41.2866,
    longitude: 174.7756,
    language: "English"
  },
  {
    id: "smooth-fm-melbourne",
    name: "Smooth FM",
    country: "Australia",
    countryCode: "AU",
    city: "Melbourne",
    genre: "Easy Listening",
    streamUrl: "https://ais-sa1.streamon.fm/7548_48k.aac",
    latitude: -37.8136,
    longitude: 144.9631,
    language: "English"
  },
  
  // More Europe
  {
    id: "radio-suisse-classique",
    name: "Radio Swiss Classic",
    country: "Switzerland",
    countryCode: "CH",
    city: "Bern",
    genre: "Classical",
    streamUrl: "http://stream.srg-ssr.ch/m/rsc_de/mp3_128",
    latitude: 46.9480,
    longitude: 7.4474,
    language: "German"
  },
  {
    id: "p3-stockholm",
    name: "P3 Sveriges Radio",
    country: "Sweden",
    countryCode: "SE",
    city: "Stockholm",
    genre: "Pop / Alternative",
    streamUrl: "https://sverigesradio.se/topsy/direkt/164-hi-mp3",
    latitude: 59.3293,
    longitude: 18.0686,
    language: "Swedish"
  },
  {
    id: "nrk-p3-oslo",
    name: "NRK P3",
    country: "Norway",
    countryCode: "NO",
    city: "Oslo",
    genre: "Pop / Alternative",
    streamUrl: "https://lyd.nrk.no/nrk_radio_p3_mp3_h",
    latitude: 59.9139,
    longitude: 10.7522,
    language: "Norwegian"
  },
  {
    id: "dr-p3-copenhagen",
    name: "DR P3",
    country: "Denmark",
    countryCode: "DK",
    city: "Copenhagen",
    genre: "Pop / Urban",
    streamUrl: "https://live-icy.dr.dk/A/A05H.mp3",
    latitude: 55.6761,
    longitude: 12.5683,
    language: "Danish"
  },
  {
    id: "yle-x3m-helsinki",
    name: "YLE X3M",
    country: "Finland",
    countryCode: "FI",
    city: "Helsinki",
    genre: "Pop / Alternative",
    streamUrl: "https://yle-radio-x3m-1-cdn.streaming.adswizz.com/yleCo6z3mJGjT.mp3",
    latitude: 60.1699,
    longitude: 24.9384,
    language: "Swedish"
  },
  {
    id: "radio-eins-berlin",
    name: "Radio Eins",
    country: "Germany",
    countryCode: "DE",
    city: "Berlin",
    genre: "Alternative / Culture",
    streamUrl: "https://dispatcher.rndfnk.com/rbb/radioeins/live/mp3/mid",
    latitude: 52.5200,
    longitude: 13.4050,
    language: "German"
  },
  {
    id: "polskie-radio-trojka",
    name: "Polskie Radio Trójka",
    country: "Poland",
    countryCode: "PL",
    city: "Warsaw",
    genre: "Culture / Jazz",
    streamUrl: "https://stream3.polskieradio.pl/p3/mp3",
    latitude: 52.2297,
    longitude: 21.0122,
    language: "Polish"
  },
  {
    id: "radio-fm4-vienna",
    name: "FM4",
    country: "Austria",
    countryCode: "AT",
    city: "Vienna",
    genre: "Alternative / Electronic",
    streamUrl: "https://orf-live.ors-shoutcast.at/fm4-q2a",
    latitude: 48.2082,
    longitude: 16.3738,
    language: "German"
  },
  {
    id: "antenne-bayern",
    name: "Antenne Bayern",
    country: "Germany",
    countryCode: "DE",
    city: "Munich",
    genre: "Pop / Hits",
    streamUrl: "https://stream.antenne.de/antenne",
    latitude: 48.1351,
    longitude: 11.5820,
    language: "German"
  },
  {
    id: "radio-portugal-antena3",
    name: "Antena 3",
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    genre: "Pop / Portuguese",
    streamUrl: "https://radiocast.rtp.pt/antena3high.mp3",
    latitude: 38.7223,
    longitude: -9.1393,
    language: "Portuguese"
  },
  
  // Russia & Eastern Europe
  {
    id: "radio-maximum-moscow",
    name: "Maximum Radio",
    country: "Russia",
    countryCode: "RU",
    city: "Moscow",
    genre: "Rock / Alternative",
    streamUrl: "https://maximum.hostingradio.ru/maximum96.aacp",
    latitude: 55.7558,
    longitude: 37.6173,
    language: "Russian"
  },
  {
    id: "europa-plus-moscow",
    name: "Europa Plus",
    country: "Russia",
    countryCode: "RU",
    city: "Moscow",
    genre: "Pop / Dance",
    streamUrl: "https://europaplus.hostingradio.ru/europaplus96.aacp",
    latitude: 55.7558,
    longitude: 37.6173,
    language: "Russian"
  },
  {
    id: "radio-prague",
    name: "Radio Wave",
    country: "Czech Republic",
    countryCode: "CZ",
    city: "Prague",
    genre: "Alternative",
    streamUrl: "https://rozhlas.stream/wave_mp3_128.mp3",
    latitude: 50.0755,
    longitude: 14.4378,
    language: "Czech"
  },
  {
    id: "radio-budapest",
    name: "Petőfi Radio",
    country: "Hungary",
    countryCode: "HU",
    city: "Budapest",
    genre: "Pop / Alternative",
    streamUrl: "https://icast.connectmedia.hu/5001/mr2.mp3",
    latitude: 47.4979,
    longitude: 19.0402,
    language: "Hungarian"
  },
  
  // Middle East
  {
    id: "radio-jordan",
    name: "Radio Jordan",
    country: "Jordan",
    countryCode: "JO",
    city: "Amman",
    genre: "Pop / Arabic",
    streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_JORDAN",
    latitude: 31.9454,
    longitude: 35.9284,
    language: "Arabic"
  },
  {
    id: "galgalatz-telaviv",
    name: "Galgalatz",
    country: "Israel",
    countryCode: "IL",
    city: "Tel Aviv",
    genre: "Pop / Hits",
    streamUrl: "https://glzwizzlv.bynetcdn.com/glglz_mp3",
    latitude: 32.0853,
    longitude: 34.7818,
    language: "Hebrew"
  },
  
  // Caribbean & Central America
  {
    id: "radio-jamaica",
    name: "RJR 94 FM",
    country: "Jamaica",
    countryCode: "JM",
    city: "Kingston",
    genre: "Reggae / Pop",
    streamUrl: "https://s3.streammonster.com:8088/stream",
    latitude: 18.0179,
    longitude: -76.8099,
    language: "English"
  },
  {
    id: "radio-mexico-beat",
    name: "Beat 100.9",
    country: "Mexico",
    countryCode: "MX",
    city: "Mexico City",
    genre: "Pop / Dance",
    streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/XHSON_FM",
    latitude: 19.4326,
    longitude: -99.1332,
    language: "Spanish"
  },
  
  // Southeast Asia
  {
    id: "fm-bangkok-965",
    name: "96.5 FM One",
    country: "Thailand",
    countryCode: "TH",
    city: "Bangkok",
    genre: "Pop / Thai",
    streamUrl: "https://stream.965fmone.com/stream",
    latitude: 13.7563,
    longitude: 100.5018,
    language: "Thai"
  },
  {
    id: "hot-fm-singapore",
    name: "Hot FM 91.3",
    country: "Singapore",
    countryCode: "SG",
    city: "Singapore",
    genre: "Pop / Urban",
    streamUrl: "https://mediacorp.rastream.com/hotfm913-aac-160",
    latitude: 1.3521,
    longitude: 103.8198,
    language: "English"
  },
  {
    id: "hard-rock-jakarta",
    name: "Hard Rock FM",
    country: "Indonesia",
    countryCode: "ID",
    city: "Jakarta",
    genre: "Rock / Pop",
    streamUrl: "https://stream.radiojar.com/hardrockfm",
    latitude: -6.2088,
    longitude: 106.8456,
    language: "Indonesian"
  },
  {
    id: "vov-hanoi",
    name: "VOV3",
    country: "Vietnam",
    countryCode: "VN",
    city: "Hanoi",
    genre: "Pop / Vietnamese",
    streamUrl: "https://stream.voh.com.vn/vov3",
    latitude: 21.0285,
    longitude: 105.8542,
    language: "Vietnamese"
  }
];

// Get unique countries
export const getCountries = (): string[] => {
  const countries = [...new Set(radioStations.map(s => s.country))];
  return countries.sort();
};

// Get unique genres
export const getGenres = (): string[] => {
  const genres = [...new Set(radioStations.map(s => s.genre))];
  return genres.sort();
};

// Get stations by country
export const getStationsByCountry = (country: string): RadioStation[] => {
  return radioStations.filter(s => s.country === country);
};

// Search stations
export const searchStations = (query: string): RadioStation[] => {
  const lowerQuery = query.toLowerCase();
  return radioStations.filter(s => 
    s.name.toLowerCase().includes(lowerQuery) ||
    s.country.toLowerCase().includes(lowerQuery) ||
    s.city.toLowerCase().includes(lowerQuery) ||
    s.genre.toLowerCase().includes(lowerQuery)
  );
};
