import { useEffect, useState } from "react";
import "../styles/HeroSlider.css";

const slides = [
  {
    img: "phonesbanner.png",
    title: "Latest Smartphones",
    desc: "Best deals on new phones"
  },
  {
    img: "girlstop.avif",
    title: "Fashion Sale",
    desc: "Trending clothes for you"
  },
  {
    img: "laptops.webp",
    title: "Electronics Store",
    desc: "Top gadgets at low price"
  },
    {
      img: "dresswomens.webp",
    title: "womens new fashion",
    desc: "trending clothes for you"
  },
    {
      img: "sarees.png",
    title: "bannarsi saree",
    desc: "traditional look for beautys"
  }
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      <div className="slide-image">
        <img src={slides[index].img} alt="slide" />
      </div>

      <div className="hero-content">
        <h1>{slides[index].title}</h1>
        <p>{slides[index].desc}</p>
      </div>
    </div>
  );
}
