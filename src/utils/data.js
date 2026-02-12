import R from "../assets";

const countryCode = "+20";

const designer = [
  {
    __v: 0,
    _id: "6477fb9145478ef0d9005d21",
    name: "Business Cards",
    img: R.images.businessCard,
    path: ",Designers,",
    info: "Our team transforms your vision into reality by creating business cards that do more than just share information; they convey your brand’s story on a single card, leaving a lasting impression.",
  },
  {
    __v: 0,
    _id: "6477fb9d45478ef0d9005d24",
    name: "Flyers",
    img: R.images.Flayer,
    path: ",Designers,",
    info: "Our team will create a flyer tailored to your needs, ensuring your message makes a significant impression!",
  },
  {
    __v: 0,
    _id: "6477fbac45478ef0d9005d2b",
    name: "Logos",
    img: R.images.Logos,
    path: ",Designers,",
    info: "Our logo designers will craft unique and memorable logos that embody your brand’s identity, blending creativity and professionalism.",
  },
  {
    __v: 0,
    _id: "6477fbba45478ef0d9005d2e",
    name: "Merchandise",
    img: R.images.Merchandies,
    path: ",Designers,",
    info: "Our merchandise team will create unique designs for your merchandise. These designs will not only reflect your brand but also align with market trends to resonate with your customers.",
  },
  {
    __v: 0,
    _id: "6477fbcd45478ef0d9005d31",
    name: "Posters",
    img: R.images.Posters,
    path: ",Designers,",
    info: "We use our expertise to create engaging posters that will effectively convey your message and enhance your brand presence.",
  },
  {
    __v: 0,
    _id: "6477fbd745478ef0d9005d34",
    name: "Icons",
    img: R.images.Icons,
    path: ",Designers,",
    info: "With our team’s expertise, we design meaningful icons that amplify your message and elevate your brand’s digital presence.",
  },
];

const animator = [
  {
    __v: 0,
    _id: "6477fb3845478ef0d9005d0e",
    name: "Animated Gifs",
    img: R.images.animatedGifs,
    path: ",Animators,",
    info: "A GIF, tailor-made just for you, will be between 5 to 10 seconds long, depending on your needs.",
  },
  {
    __v: 0,
    _id: "6477fb4945478ef0d9005d11",
    name: "Animated Logo",
    img: R.images.animatorLogo,
    path: ",Animators,",
    info: "Our custom animated logos are not just logos, but a journey in the world of branding. These logos are designed to tell your brand’s story in a captivating and engaging way.",
  },
  {
    __v: 0,
    _id: "6477fb7d45478ef0d9005d1e",
    name: "2D Animation",
    img: R.images.twoD_animation,
    path: ",Animators,",
    info: "Join us in the art of 2D animation, where we blend traditional techniques and modern technology to transform your ideas into vibrant, fluid, and captivating visual narratives.",
  },
  {
    __v: 0,
    _id: "6477fb6e45478ef0d9005d17",
    name: "3D Animation",
    img: R.images.threeD_anmation,
    path: ",Animators,",
    info: "Step into the realm of 3D animation with us, where we use cutting-edge technology and creative artistry to turn your ideas into dynamic, three-dimensional visual masterpieces.",
  },  
];

const categoryList = [
  { id: "6477fb1f45478ef0d9005d08", name: "Animators", path: null },
  { id: "6477fb2945478ef0d9005d0b", name: "Designers", path: null },
];

function getImageByName(name) {
  let image;
  switch (name) {
    case "Business Cards":
      image = R.images.businessCard;
      break;
    case "Flyers":
      image = R.images.Flayer;
      break;
    case "Logos":
      image = R.images.Logos;
      break;
    case "Merchandise":
      image = R.images.Merchandies;
      break;
    case "Posters":
      image = R.images.Posters;
      break;
    case "Icons":
      image = R.images.Icons;
      break;
    case "Animated Gifs":
      image = R.images.animatedGifs;
      break;
    case "Animated Logo":
      image = R.images.animatorLogo;
      break;
    case "3D Animation":
      image = R.images.threeD_anmation;
      break;
    case "2D Animation":
      image = R.images.twoD_animation;
      break;
    default:
      image = R.images.Logos;
  }
  return image;
}

export { countryCode, designer, animator, categoryList, getImageByName };
