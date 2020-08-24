// "https://kpopping.com/uploads/documents/4e/3/kpics_gallery/x3-3,281,29.jpeg.keep.fff.png.pagespeed.ic.P-mBa33ujA.jpg";
// http://images6.fanpop.com/image/photos/43100000/IU-2020-Season-s-Greetings-POSTCARD-CALENDAR-iu-43191775-2300-3474.jpg
// "https://i.redd.it/wd3xrigeisc41.png";

const iuBanners = [
  {
    bannerUrl:
      "https://kpopping.com/uploads/documents/4e/3/kpics_gallery/x3-3,281,29.jpeg.keep.fff.png.pagespeed.ic.P-mBa33ujA.jpg",
    bannerColor: "#b9bebd",
    textColor: "#8e9ba9",
  },
  {
    bannerUrl:
      "http://images6.fanpop.com/image/photos/43100000/IU-2020-Season-s-Greetings-POSTCARD-CALENDAR-iu-43191775-2300-3474.jpg",
    bannerColor: "#ad6a74",
    textColor: "#e6e8ed",
  },
  {
    bannerUrl: "https://i.redd.it/wd3xrigeisc41.png",
    bannerColor: "#93a4ad",
    textColor: "#8e9ba9",
  },
];

const iu = {
  artistId: 1,
  artist: "IU",
  summary:
    "IU (아이유) is a South Korean singer-songwriter and actress currently under EDAM Entertainment. She debuted on September 18, 2008 with a stage on M Countdown for the song &quot;Lost Child&quot;. Her stage name is derived from the phrase &quot;I and You&quot;, symbolizing that people can become one through music.",
  ...iuBanners[1],
};

const blackPinkBanners = [
  {
    bannerUrl:
      "https://kpopping.com/uploads/documents/60/5/kpics_gallery/x80103595_20200626005743_org.jpeg.keep.fff.png.pagespeed.ic.wsfj-rUsc5.webp",
    bannerColor: "#72655d",
    textColor: "#8e9ba9",
  },
  {
    bannerUrl:
      "https://kpopping.com/uploads/documents/32/1/DtscZaBU0AApVwK.jpeg",
    bannerColor: "#181620",
    textColor: "#decbdd",
  },
];

const blackpink = {
  artistId: 2,
  artist: "BLACKPINK",
  summary:
    "Black Pink (Hangul: 블랙핑크), stylized as BLACKPINK or BLΛƆKPIИK, is a South Korean girl group formed by YG Entertainment and the first girl group to debut under the same entertainment company seven years after 2NE1. The group consists of four members: Jennie, Lisa, Jisoo, and Rose. They officially debuted on August 8, 2016 with the single album Square One. Black Pink fans are called &quot;Blink&quot;.",
  ...blackPinkBanners[1],
};

export { iu, blackpink };
