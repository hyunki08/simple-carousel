import React, { forwardRef, useLayoutEffect, useRef, useState } from "react";
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

const Item = forwardRef(({ data }, ref) => {
  return (
    <div className={styles.item} ref={ref}>
      <div className={styles.item__content}>{data}</div>
    </div>
  );
});
Item.displayName = "Item";

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
        {datas && datas.map((v, i) => <Item key={`${v}_${i}`} data={v} />)}
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
