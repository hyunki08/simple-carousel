import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "../styles/Carousel.module.css";

const Controller = ({ datas, current, set, onClickNext, onClickPrev }) => {
  return (
    <div id={styles.controller}>
      <button id={styles.btn__prev} onClick={onClickPrev}>
        Prev
      </button>
      <div id={styles.indicators}>
        {datas &&
          datas.map((v, i) => (
            <button key={`${v}_${i}`} className={`${styles.indicator}${current === i ? ", " + styles.current : ""}`} onClick={() => set(i)}>
              {v}
            </button>
          ))}
      </div>
      <button id={styles.btn__next} onClick={onClickNext}>
        Next
      </button>
    </div>
  );
};

const Container = ({ datas, current }) => {
  const itemsRef = useRef(null);

  useLayoutEffect(() => {
    if (itemsRef.current) {
      itemsRef.current.style.transform = `translateX(-${current * 100}%)`;
    }
  }, [current]);

  return (
    <div id={styles.container}>
      <div id={styles.items} ref={itemsRef}>
        {datas &&
          datas.map((v, i) => (
            <div key={`${v}_${i}`} className={styles.item}>
              <div className={styles.item__content}>{v}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

const Carousel = (props) => {
  const [current, setCurrent] = useState(0);

  const onClickNext = () => {
    set((current + 1) % props.datas.length);
  };
  const onClickPrev = () => {
    set(current ? current - 1 : props.datas.length - 1);
  };
  const set = (index) => {
    setCurrent(index);
  };

  return (
    <>
      <Container {...props} current={current} />
      <Controller {...props} current={current} set={set} onClickNext={onClickNext} onClickPrev={onClickPrev} />
    </>
  );
};

export default Carousel;
