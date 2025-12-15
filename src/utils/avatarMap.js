import freework from "../assets/free-work.jpg";
import icebear from "../assets/icebear.jpg";
import julemandven from "../assets/julemand-ven.jpg";
import juletræ from "../assets/juletræ.jpg";
import julmand from "../assets/julmand.jpg";
import mai from "../assets/mai.jpg";
import penguin from "../assets/penguin.jpg";
import rasmus from "../assets/rasmus.jpg";
import star from "../assets/star.jpg";
import wolf from "../assets/wolf.jpg";

export const AVATAR_MAP = {
  "freework": freework,
  "icebear": icebear,
  "julemandven": julemandven,
  "juletræ": juletræ,
  "julmand": julmand,
  "mai": mai,
  "penguin": penguin,
  "rasmus": rasmus,
  "star": star,
  "wolf": wolf,
  // Seed Aliases
  "fairybread": juletræ,
  "gingerbread": julmand,
  "rudolf": icebear,
  "snowman": julemandven,
  // Fallback
  "default": julemandven
};

export const AVAILABLE_AVATARS = [
  { id: "freework", src: freework },
  { id: "icebear", src: icebear },
  { id: "julemandven", src: julemandven },
  { id: "juletræ", src: juletræ },
  { id: "julmand", src: julmand },
  { id: "mai", src: mai },
  { id: "penguin", src: penguin },
  { id: "rasmus", src: rasmus },
  { id: "star", src: star },
  { id: "wolf", src: wolf },
];
