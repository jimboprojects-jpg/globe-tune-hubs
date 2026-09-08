import type { Lang } from "@/lib/locale";

export interface SeoEntry {
  t: string;
  d: string;
}

export type SeoPage =
  | "home"
  | "countries"
  | "country"
  | "genres"
  | "genre"
  | "blog"
  | "station"
  | "faq"
  | "about"
  | "terms"
  | "privacy";

type SeoTable = Record<SeoPage, SeoEntry>;

/**
 * Per-language titles/descriptions. `{name}` is replaced with the country,
 * genre or station name at render time.
 */
export const seo: Record<Lang, SeoTable> = {
  en: {
    home: {
      t: "CartoFM – Stream Live Radio Stations Worldwide",
      d: "Listen to thousands of live radio stations from around the world on an interactive 3D globe. Music, news and talk radio streaming free.",
    },
    countries: {
      t: "Radio by Country – Browse Live Stations Worldwide | CartoFM",
      d: "Browse live radio stations by country. Explore thousands of FM, AM and internet radio streams from every nation on CartoFM.",
    },
    country: {
      t: "{name} Radio Stations – Listen Live Online | CartoFM",
      d: "Listen to live radio stations from {name}. Stream local music, news and talk radio for free on CartoFM.",
    },
    genres: {
      t: "Radio by Genre – Pop, Rock, Jazz, News & More | CartoFM",
      d: "Browse live radio stations by genre. Stream pop, rock, jazz, classical, electronic, hip-hop and news stations worldwide.",
    },
    genre: {
      t: "{name} Radio Stations – Listen Live Free | CartoFM",
      d: "Stream live {name} radio stations from around the world for free on CartoFM's interactive radio globe.",
    },
    blog: {
      t: "World Radio Blog – Music Discovery & Country Guides | CartoFM",
      d: "Stories, guides and deep dives on world radio culture, music discovery and country-by-country radio traditions.",
    },
    station: {
      t: "{name} – Listen Live Online | CartoFM",
      d: "Listen to {name} live online for free. Stream this radio station instantly on CartoFM.",
    },
    faq: {
      t: "Frequently Asked Questions | CartoFM",
      d: "Answers to common questions about listening to live radio online with CartoFM.",
    },
    about: {
      t: "Who We Are – About CartoFM",
      d: "CartoFM brings radio stations from every corner of the globe into one interactive listening experience.",
    },
    terms: {
      t: "Terms of Service | CartoFM",
      d: "The terms that govern your use of the CartoFM live radio streaming service.",
    },
    privacy: {
      t: "Privacy Policy | CartoFM",
      d: "How CartoFM handles data, cookies and your privacy while you listen to live radio.",
    },
  },
  fr: {
    home: {
      t: "CartoFM – Écoutez les radios du monde en direct",
      d: "Écoutez des milliers de radios en direct du monde entier sur un globe 3D interactif. Musique, actualités et talk-radio gratuits.",
    },
    countries: {
      t: "Radio par pays – Stations en direct du monde entier | CartoFM",
      d: "Parcourez les radios en direct par pays. Des milliers de flux FM, AM et internet de chaque nation sur CartoFM.",
    },
    country: {
      t: "Radios de {name} – Écouter en direct en ligne | CartoFM",
      d: "Écoutez les radios en direct de {name}. Musique locale, informations et talk-radio gratuits sur CartoFM.",
    },
    genres: {
      t: "Radio par genre – Pop, rock, jazz, infos et plus | CartoFM",
      d: "Parcourez les radios par genre : pop, rock, jazz, classique, électro, hip-hop et actualités du monde entier.",
    },
    genre: {
      t: "Radios {name} – Écouter en direct gratuitement | CartoFM",
      d: "Écoutez gratuitement des radios {name} en direct du monde entier sur le globe interactif CartoFM.",
    },
    blog: {
      t: "Blog radio du monde – Découvertes musicales et guides | CartoFM",
      d: "Récits, guides et analyses sur la culture radio mondiale, la découverte musicale et les traditions radio par pays.",
    },
    station: {
      t: "{name} – Écouter en direct en ligne | CartoFM",
      d: "Écoutez {name} en direct et gratuitement. Diffusion instantanée de cette radio sur CartoFM.",
    },
    faq: {
      t: "Questions fréquentes | CartoFM",
      d: "Réponses aux questions courantes sur l'écoute de la radio en direct avec CartoFM.",
    },
    about: {
      t: "Qui sommes-nous – À propos de CartoFM",
      d: "CartoFM réunit les radios du monde entier dans une expérience d'écoute interactive.",
    },
    terms: {
      t: "Conditions d'utilisation | CartoFM",
      d: "Les conditions qui régissent votre utilisation du service d'écoute radio CartoFM.",
    },
    privacy: {
      t: "Politique de confidentialité | CartoFM",
      d: "Comment CartoFM traite les données, les cookies et votre vie privée pendant votre écoute.",
    },
  },
  es: {
    home: {
      t: "CartoFM – Escucha radios en vivo de todo el mundo",
      d: "Escucha miles de emisoras de radio en vivo de todo el mundo en un globo 3D interactivo. Música, noticias y programas gratis.",
    },
    countries: {
      t: "Radio por país – Emisoras en vivo de todo el mundo | CartoFM",
      d: "Explora emisoras de radio en vivo por país. Miles de señales FM, AM e internet de cada nación en CartoFM.",
    },
    country: {
      t: "Emisoras de radio de {name} – Escuchar en vivo | CartoFM",
      d: "Escucha emisoras en vivo de {name}. Música local, noticias y programas de radio gratis en CartoFM.",
    },
    genres: {
      t: "Radio por género – Pop, rock, jazz, noticias y más | CartoFM",
      d: "Explora emisoras por género: pop, rock, jazz, clásica, electrónica, hip-hop y noticias de todo el mundo.",
    },
    genre: {
      t: "Emisoras de radio {name} – Escuchar gratis en vivo | CartoFM",
      d: "Escucha gratis emisoras {name} en vivo de todo el mundo en el globo interactivo de CartoFM.",
    },
    blog: {
      t: "Blog de radio mundial – Descubrimiento musical y guías | CartoFM",
      d: "Historias, guías y análisis sobre la cultura radiofónica mundial y las tradiciones de radio por país.",
    },
    station: {
      t: "{name} – Escuchar en vivo en línea | CartoFM",
      d: "Escucha {name} en vivo y gratis. Reproduce esta emisora al instante en CartoFM.",
    },
    faq: {
      t: "Preguntas frecuentes | CartoFM",
      d: "Respuestas a las dudas más comunes sobre escuchar radio en vivo con CartoFM.",
    },
    about: {
      t: "Quiénes somos – Sobre CartoFM",
      d: "CartoFM reúne emisoras de todos los rincones del planeta en una experiencia de escucha interactiva.",
    },
    terms: {
      t: "Términos del servicio | CartoFM",
      d: "Los términos que rigen el uso del servicio de radio en vivo CartoFM.",
    },
    privacy: {
      t: "Política de privacidad | CartoFM",
      d: "Cómo CartoFM gestiona los datos, las cookies y tu privacidad mientras escuchas la radio.",
    },
  },
  de: {
    home: {
      t: "CartoFM – Live-Radiosender aus aller Welt streamen",
      d: "Höre tausende Live-Radiosender aus aller Welt auf einem interaktiven 3D-Globus. Musik, Nachrichten und Talkradio kostenlos.",
    },
    countries: {
      t: "Radio nach Land – Live-Sender weltweit | CartoFM",
      d: "Entdecke Live-Radiosender nach Land. Tausende UKW-, AM- und Internetstreams aus jedem Land auf CartoFM.",
    },
    country: {
      t: "Radiosender aus {name} – Live online hören | CartoFM",
      d: "Höre Live-Radiosender aus {name}. Lokale Musik, Nachrichten und Talkradio kostenlos auf CartoFM.",
    },
    genres: {
      t: "Radio nach Genre – Pop, Rock, Jazz, News und mehr | CartoFM",
      d: "Radiosender nach Genre entdecken: Pop, Rock, Jazz, Klassik, Elektro, Hip-Hop und Nachrichten weltweit.",
    },
    genre: {
      t: "{name} Radiosender – Kostenlos live hören | CartoFM",
      d: "Höre kostenlos {name}-Radiosender aus aller Welt auf dem interaktiven Radioglobus von CartoFM.",
    },
    blog: {
      t: "Weltradio-Blog – Musikentdeckung und Länderguides | CartoFM",
      d: "Geschichten, Guides und Hintergründe zur weltweiten Radiokultur und zu Radiotraditionen einzelner Länder.",
    },
    station: {
      t: "{name} – Live online hören | CartoFM",
      d: "Höre {name} kostenlos live. Diesen Radiosender sofort auf CartoFM streamen.",
    },
    faq: {
      t: "Häufige Fragen | CartoFM",
      d: "Antworten auf häufige Fragen zum Hören von Live-Radio mit CartoFM.",
    },
    about: {
      t: "Wer wir sind – Über CartoFM",
      d: "CartoFM vereint Radiosender aus aller Welt in einem interaktiven Hörerlebnis.",
    },
    terms: {
      t: "Nutzungsbedingungen | CartoFM",
      d: "Die Bedingungen für die Nutzung des Live-Radiodienstes CartoFM.",
    },
    privacy: {
      t: "Datenschutzerklärung | CartoFM",
      d: "Wie CartoFM mit Daten, Cookies und deiner Privatsphäre beim Radiohören umgeht.",
    },
  },
  sw: {
    home: {
      t: "CartoFM – Sikiliza redio za moja kwa moja duniani kote",
      d: "Sikiliza maelfu ya vituo vya redio vya moja kwa moja duniani kote kwenye dunia ya 3D. Muziki, habari na maongezi bure.",
    },
    countries: {
      t: "Redio kwa Nchi – Vituo vya moja kwa moja duniani | CartoFM",
      d: "Vinjari vituo vya redio kwa nchi. Maelfu ya matangazo ya FM, AM na mtandaoni kutoka kila nchi kwenye CartoFM.",
    },
    country: {
      t: "Vituo vya Redio vya {name} – Sikiliza mtandaoni | CartoFM",
      d: "Sikiliza vituo vya redio vya moja kwa moja kutoka {name}. Muziki, habari na maongezi bure kwenye CartoFM.",
    },
    genres: {
      t: "Redio kwa Aina – Pop, Rock, Jazz, Habari na zaidi | CartoFM",
      d: "Vinjari vituo vya redio kwa aina: pop, rock, jazz, klasiki, elektroniki, hip-hop na habari duniani kote.",
    },
    genre: {
      t: "Vituo vya Redio vya {name} – Sikiliza bure | CartoFM",
      d: "Sikiliza bure vituo vya redio vya {name} kutoka duniani kote kwenye dunia shirikishi ya CartoFM.",
    },
    blog: {
      t: "Blogu ya Redio ya Dunia – Ugunduzi wa muziki na miongozo | CartoFM",
      d: "Hadithi, miongozo na uchambuzi kuhusu utamaduni wa redio duniani na mila za redio za kila nchi.",
    },
    station: {
      t: "{name} – Sikiliza moja kwa moja mtandaoni | CartoFM",
      d: "Sikiliza {name} moja kwa moja bila malipo. Cheza kituo hiki papo hapo kwenye CartoFM.",
    },
    faq: {
      t: "Maswali Yanayoulizwa Mara kwa Mara | CartoFM",
      d: "Majibu ya maswali ya kawaida kuhusu kusikiliza redio ya moja kwa moja na CartoFM.",
    },
    about: {
      t: "Sisi ni Nani – Kuhusu CartoFM",
      d: "CartoFM inakusanya vituo vya redio kutoka kila pembe ya dunia katika uzoefu mmoja shirikishi.",
    },
    terms: {
      t: "Masharti ya Huduma | CartoFM",
      d: "Masharti yanayosimamia matumizi yako ya huduma ya redio ya moja kwa moja ya CartoFM.",
    },
    privacy: {
      t: "Sera ya Faragha | CartoFM",
      d: "Jinsi CartoFM inavyoshughulikia data, vidakuzi na faragha yako unaposikiliza redio.",
    },
  },
  zh: {
    home: {
      t: "CartoFM – 在线收听全球直播电台",
      d: "在交互式 3D 地球上收听来自世界各地的数千个直播电台，音乐、新闻与谈话节目免费畅听。",
    },
    countries: {
      t: "按国家收听电台 – 全球直播广播 | CartoFM",
      d: "按国家浏览直播电台，收听来自各个国家的数千个调频、调幅和网络广播流。",
    },
    country: {
      t: "{name}电台 – 在线免费直播收听 | CartoFM",
      d: "收听来自{name}的直播电台，免费畅听当地音乐、新闻和谈话节目。",
    },
    genres: {
      t: "按类型收听电台 – 流行、摇滚、爵士、新闻等 | CartoFM",
      d: "按类型浏览电台：流行、摇滚、爵士、古典、电子、嘻哈与新闻，覆盖全球。",
    },
    genre: {
      t: "{name}电台 – 免费在线直播 | CartoFM",
      d: "在 CartoFM 交互式电台地球上免费收听来自世界各地的{name}电台。",
    },
    blog: {
      t: "世界电台博客 – 音乐发现与国家指南 | CartoFM",
      d: "关于全球广播文化、音乐发现以及各国广播传统的故事与深度指南。",
    },
    station: {
      t: "{name} – 在线直播收听 | CartoFM",
      d: "免费在线收听 {name} 直播，在 CartoFM 上即刻播放该电台。",
    },
    faq: {
      t: "常见问题 | CartoFM",
      d: "关于使用 CartoFM 收听直播电台的常见问题解答。",
    },
    about: {
      t: "关于我们 – CartoFM 简介",
      d: "CartoFM 将世界各地的电台汇聚到一个交互式收听体验中。",
    },
    terms: {
      t: "服务条款 | CartoFM",
      d: "使用 CartoFM 直播电台服务所适用的条款。",
    },
    privacy: {
      t: "隐私政策 | CartoFM",
      d: "CartoFM 在您收听广播时如何处理数据、Cookie 与您的隐私。",
    },
  },
  ru: {
    home: {
      t: "CartoFM – Слушайте радиостанции мира в прямом эфире",
      d: "Тысячи радиостанций со всего мира в прямом эфире на интерактивном 3D-глобусе. Музыка, новости и разговорное радио бесплатно.",
    },
    countries: {
      t: "Радио по странам – Прямые эфиры со всего мира | CartoFM",
      d: "Просматривайте радиостанции по странам: тысячи FM-, AM- и интернет-потоков из каждой страны на CartoFM.",
    },
    country: {
      t: "Радиостанции {name} – Слушать онлайн бесплатно | CartoFM",
      d: "Слушайте прямые эфиры радиостанций {name}: местная музыка, новости и разговорное радио бесплатно.",
    },
    genres: {
      t: "Радио по жанрам – Поп, рок, джаз, новости и другое | CartoFM",
      d: "Радиостанции по жанрам: поп, рок, джаз, классика, электроника, хип-хоп и новости со всего мира.",
    },
    genre: {
      t: "Радиостанции {name} – Слушать бесплатно онлайн | CartoFM",
      d: "Слушайте бесплатно радиостанции {name} со всего мира на интерактивном глобусе CartoFM.",
    },
    blog: {
      t: "Блог о мировом радио – Музыка и гиды по странам | CartoFM",
      d: "Истории, гиды и обзоры о мировой радиокультуре, поиске музыки и радиотрадициях разных стран.",
    },
    station: {
      t: "{name} – Слушать прямой эфир онлайн | CartoFM",
      d: "Слушайте {name} в прямом эфире бесплатно. Запустите станцию мгновенно на CartoFM.",
    },
    faq: {
      t: "Часто задаваемые вопросы | CartoFM",
      d: "Ответы на частые вопросы о прослушивании прямых радиоэфиров на CartoFM.",
    },
    about: {
      t: "О нас – CartoFM",
      d: "CartoFM объединяет радиостанции со всего мира в одном интерактивном опыте прослушивания.",
    },
    terms: {
      t: "Условия использования | CartoFM",
      d: "Условия, регулирующие использование сервиса прямого радио CartoFM.",
    },
    privacy: {
      t: "Политика конфиденциальности | CartoFM",
      d: "Как CartoFM обрабатывает данные, файлы cookie и вашу конфиденциальность.",
    },
  },
  hi: {
    home: {
      t: "CartoFM – दुनिया भर के लाइव रेडियो स्टेशन सुनें",
      d: "इंटरैक्टिव 3D ग्लोब पर दुनिया भर के हज़ारों लाइव रेडियो स्टेशन सुनें। संगीत, समाचार और टॉक रेडियो मुफ़्त।",
    },
    countries: {
      t: "देश के अनुसार रेडियो – दुनिया भर के लाइव स्टेशन | CartoFM",
      d: "देश के अनुसार लाइव रेडियो स्टेशन देखें। हर देश से हज़ारों FM, AM और इंटरनेट स्ट्रीम।",
    },
    country: {
      t: "{name} के रेडियो स्टेशन – ऑनलाइन लाइव सुनें | CartoFM",
      d: "{name} के लाइव रेडियो स्टेशन सुनें। स्थानीय संगीत, समाचार और टॉक रेडियो मुफ़्त।",
    },
    genres: {
      t: "शैली के अनुसार रेडियो – पॉप, रॉक, जैज़, समाचार | CartoFM",
      d: "शैली के अनुसार रेडियो स्टेशन: पॉप, रॉक, जैज़, शास्त्रीय, इलेक्ट्रॉनिक, हिप-हॉप और समाचार।",
    },
    genre: {
      t: "{name} रेडियो स्टेशन – मुफ़्त लाइव सुनें | CartoFM",
      d: "CartoFM के इंटरैक्टिव ग्लोब पर दुनिया भर के {name} रेडियो स्टेशन मुफ़्त सुनें।",
    },
    blog: {
      t: "विश्व रेडियो ब्लॉग – संगीत खोज और देश गाइड | CartoFM",
      d: "विश्व रेडियो संस्कृति, संगीत खोज और देशवार रेडियो परंपराओं पर कहानियाँ और गाइड।",
    },
    station: {
      t: "{name} – ऑनलाइन लाइव सुनें | CartoFM",
      d: "{name} को मुफ़्त लाइव सुनें। CartoFM पर यह स्टेशन तुरंत चलाएँ।",
    },
    faq: {
      t: "अक्सर पूछे जाने वाले प्रश्न | CartoFM",
      d: "CartoFM पर लाइव रेडियो सुनने से जुड़े सामान्य प्रश्नों के उत्तर।",
    },
    about: {
      t: "हम कौन हैं – CartoFM के बारे में",
      d: "CartoFM दुनिया के हर कोने के रेडियो स्टेशनों को एक इंटरैक्टिव अनुभव में लाता है।",
    },
    terms: {
      t: "सेवा की शर्तें | CartoFM",
      d: "CartoFM लाइव रेडियो सेवा के उपयोग को नियंत्रित करने वाली शर्तें।",
    },
    privacy: {
      t: "गोपनीयता नीति | CartoFM",
      d: "रेडियो सुनते समय CartoFM डेटा, कुकीज़ और आपकी गोपनीयता कैसे संभालता है।",
    },
  },
  ar: {
    home: {
      t: "CartoFM – استمع إلى إذاعات العالم مباشرة",
      d: "استمع إلى آلاف المحطات الإذاعية المباشرة من جميع أنحاء العالم على كرة أرضية تفاعلية. موسيقى وأخبار وبرامج حوارية مجانًا.",
    },
    countries: {
      t: "الإذاعات حسب الدولة – محطات مباشرة حول العالم | CartoFM",
      d: "تصفح المحطات الإذاعية المباشرة حسب الدولة: آلاف بثوث FM وAM والإنترنت من كل بلد.",
    },
    country: {
      t: "محطات إذاعة {name} – استمع مباشرة عبر الإنترنت | CartoFM",
      d: "استمع إلى المحطات الإذاعية المباشرة من {name}: موسيقى محلية وأخبار وبرامج حوارية مجانًا.",
    },
    genres: {
      t: "الإذاعات حسب النوع – بوب وروك وجاز وأخبار | CartoFM",
      d: "تصفح المحطات حسب النوع: بوب، روك، جاز، كلاسيكي، إلكتروني، هيب هوب وأخبار من العالم كله.",
    },
    genre: {
      t: "محطات إذاعة {name} – استمع مجانًا مباشرة | CartoFM",
      d: "استمع مجانًا إلى محطات {name} المباشرة من جميع أنحاء العالم على كرة CartoFM التفاعلية.",
    },
    blog: {
      t: "مدونة إذاعات العالم – اكتشاف الموسيقى وأدلة الدول | CartoFM",
      d: "قصص وأدلة ومقالات معمقة عن ثقافة الإذاعة حول العالم وتقاليد الراديو في كل بلد.",
    },
    station: {
      t: "{name} – استمع مباشرة عبر الإنترنت | CartoFM",
      d: "استمع إلى {name} مباشرة ومجانًا، وشغّل هذه المحطة فورًا على CartoFM.",
    },
    faq: {
      t: "الأسئلة الشائعة | CartoFM",
      d: "إجابات عن الأسئلة الشائعة حول الاستماع إلى الإذاعة المباشرة عبر CartoFM.",
    },
    about: {
      t: "من نحن – عن CartoFM",
      d: "يجمع CartoFM محطات الإذاعة من كل أنحاء العالم في تجربة استماع تفاعلية واحدة.",
    },
    terms: {
      t: "شروط الخدمة | CartoFM",
      d: "الشروط التي تحكم استخدامك لخدمة البث الإذاعي المباشر CartoFM.",
    },
    privacy: {
      t: "سياسة الخصوصية | CartoFM",
      d: "كيف يتعامل CartoFM مع البيانات وملفات تعريف الارتباط وخصوصيتك أثناء الاستماع.",
    },
  },
  pt: {
    home: {
      t: "CartoFM – Ouça rádios ao vivo do mundo inteiro",
      d: "Ouça milhares de rádios ao vivo de todo o mundo num globo 3D interativo. Música, notícias e programas de rádio grátis.",
    },
    countries: {
      t: "Rádio por país – Estações ao vivo pelo mundo | CartoFM",
      d: "Explore rádios ao vivo por país: milhares de transmissões FM, AM e online de todas as nações.",
    },
    country: {
      t: "Rádios de {name} – Ouvir ao vivo online | CartoFM",
      d: "Ouça rádios ao vivo de {name}. Música local, notícias e programas de rádio grátis na CartoFM.",
    },
    genres: {
      t: "Rádio por gênero – Pop, rock, jazz, notícias e mais | CartoFM",
      d: "Explore rádios por gênero: pop, rock, jazz, clássica, eletrônica, hip-hop e notícias do mundo todo.",
    },
    genre: {
      t: "Rádios de {name} – Ouvir ao vivo grátis | CartoFM",
      d: "Ouça grátis rádios de {name} ao vivo de todo o mundo no globo interativo da CartoFM.",
    },
    blog: {
      t: "Blog do rádio mundial – Descoberta musical e guias | CartoFM",
      d: "Histórias, guias e análises sobre a cultura do rádio no mundo e as tradições de cada país.",
    },
    station: {
      t: "{name} – Ouvir ao vivo online | CartoFM",
      d: "Ouça {name} ao vivo e de graça. Toque esta rádio instantaneamente na CartoFM.",
    },
    faq: {
      t: "Perguntas frequentes | CartoFM",
      d: "Respostas às dúvidas mais comuns sobre ouvir rádio ao vivo na CartoFM.",
    },
    about: {
      t: "Quem somos – Sobre a CartoFM",
      d: "A CartoFM reúne rádios de todos os cantos do planeta numa experiência de escuta interativa.",
    },
    terms: {
      t: "Termos de serviço | CartoFM",
      d: "Os termos que regem o uso do serviço de rádio ao vivo CartoFM.",
    },
    privacy: {
      t: "Política de privacidade | CartoFM",
      d: "Como a CartoFM trata dados, cookies e a sua privacidade enquanto você ouve rádio.",
    },
  },
  id: {
    home: {
      t: "CartoFM – Dengarkan radio langsung dari seluruh dunia",
      d: "Dengarkan ribuan stasiun radio langsung dari seluruh dunia di globe 3D interaktif. Musik, berita, dan talk radio gratis.",
    },
    countries: {
      t: "Radio per Negara – Stasiun langsung sedunia | CartoFM",
      d: "Jelajahi stasiun radio langsung per negara: ribuan siaran FM, AM, dan internet dari setiap negara.",
    },
    country: {
      t: "Stasiun Radio {name} – Dengarkan langsung online | CartoFM",
      d: "Dengarkan stasiun radio langsung dari {name}. Musik lokal, berita, dan talk radio gratis di CartoFM.",
    },
    genres: {
      t: "Radio per Genre – Pop, rock, jazz, berita, dan lainnya | CartoFM",
      d: "Jelajahi stasiun radio per genre: pop, rock, jazz, klasik, elektronik, hip-hop, dan berita sedunia.",
    },
    genre: {
      t: "Stasiun Radio {name} – Dengarkan gratis langsung | CartoFM",
      d: "Dengarkan gratis stasiun radio {name} dari seluruh dunia di globe interaktif CartoFM.",
    },
    blog: {
      t: "Blog Radio Dunia – Penemuan musik dan panduan negara | CartoFM",
      d: "Cerita, panduan, dan ulasan mendalam tentang budaya radio dunia serta tradisi radio tiap negara.",
    },
    station: {
      t: "{name} – Dengarkan langsung online | CartoFM",
      d: "Dengarkan {name} secara langsung dan gratis. Putar stasiun ini seketika di CartoFM.",
    },
    faq: {
      t: "Pertanyaan yang sering diajukan | CartoFM",
      d: "Jawaban atas pertanyaan umum tentang mendengarkan radio langsung di CartoFM.",
    },
    about: {
      t: "Siapa Kami – Tentang CartoFM",
      d: "CartoFM menyatukan stasiun radio dari seluruh penjuru dunia dalam satu pengalaman interaktif.",
    },
    terms: {
      t: "Ketentuan Layanan | CartoFM",
      d: "Ketentuan yang mengatur penggunaan layanan radio langsung CartoFM.",
    },
    privacy: {
      t: "Kebijakan Privasi | CartoFM",
      d: "Bagaimana CartoFM menangani data, cookie, dan privasi Anda saat mendengarkan radio.",
    },
  },
};

export function seoText(
  lang: Lang,
  page: SeoPage,
  name?: string,
): { title: string; description: string } {
  const entry = seo[lang][page];
  const fill = (s: string) => (name ? s.replace(/\{name\}/g, name) : s);
  return { title: fill(entry.t), description: fill(entry.d) };
}
