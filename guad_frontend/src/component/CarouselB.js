import { useRef } from "react";
import style from "../source/Carousel.module.css";

function CarouselB() {
  const text1 = useRef();
  const text2 = useRef();
  const elts = {
    text1: text1,
    text2: text2,
  };

  const texts = ["Why", "is", "this", "so", "satisfying", "to", "watch?"];
  const morphTime = 1;
  const cooldownTime = 0.25;

  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  elts[0].current.innerHtml = texts[textIndex % texts.length];
  elts[1].textContent = texts[(textIndex + 1) % texts.length];

  const doMorph = () => {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  };

  const setMorph = (fraction) => {
    elts[1].style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts[1].style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts[0].style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts[0].style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts[0].textContent = texts[textIndex % texts.length];
    elts[1].textContent = texts[(textIndex + 1) % texts.length];
  };

  const doCooldown = () => {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
  };

  const animate = () => {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  };
  animate();

  return (
    <>
      <div id="container" className={style.container}>
        <span id="text1" ref={text1}></span>
        <span id="text2" ref={text2}></span>
      </div>

      <svg id="filters" className={style.filters}>
        <defs>
          <filter id="threshold" className={style.threshold}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
export default CarouselB;
