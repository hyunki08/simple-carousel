import React, { forwardRef, memo, useCallback, useEffect, useRef, useState } from "react";
import styles from "../styles/Carousel.module.css";

const Controller = memo(({ onClickNext, onClickPrev }) => {
  return (
    <div id={styles.controller}>
      <button id={styles.btn__prev} onClick={onClickPrev}>
        Prev
      </button>
      <button id={styles.btn__next} onClick={onClickNext}>
        Next
      </button>
    </div>
  );
});
Controller.displayName = "Controller";

const Item = forwardRef(({ data }, ref) => {
  const onTransitionEnd = (e) => {
    e.target.style.opacity = "1";
  };

  return (
    <div className={styles.item_infinite} onTransitionEnd={onTransitionEnd} ref={ref}>
      <div className={styles.item__content}>{data}</div>
    </div>
  );
});
Item.displayName = "Item";

const Container = ({ datas, current }) => {
  const [prev, setPrev] = useState(current);
  const itemsRefs = useRef([]);
  const [positions, setPositions] = useState(!!datas ? Array.from({ length: datas.length }, () => 0) : []);

  useEffect(() => {
    const outIndex = datas.length - 1;
    const arr = Array.from({ length: datas.length }, () => 0);
    itemsRefs.current[outIndex].style.opacity = "0";
    itemsRefs.current[outIndex].style.transform = `translateX(${-(100 * datas.length)}%)`;
    arr[outIndex] = -(100 * datas.length);
    setPositions(arr);
  }, []);

  useEffect(() => {
    if (current === prev - 1 || (prev === 0 && current === datas.length - 1)) {
      // Prev
      const outIndex = current ? current - 1 : datas.length - 1;
      const arr = Array.from({ length: datas.length }, () => 0);
      positions.forEach((v, i) => {
        itemsRefs.current[i].style.opacity = "1";
        itemsRefs.current[i].style.transform = `translateX(${v + 100}%)`;
        arr[i] = v + 100;
      });
      itemsRefs.current[outIndex].style.opacity = "0";
      itemsRefs.current[outIndex].style.transform = `translateX(${arr[outIndex] - 100 * datas.length}%)`;
      arr[outIndex] = arr[outIndex] - 100 * datas.length;
      setPrev(current);
      setPositions(arr);
    } else if (current === prev + 1 || (current !== prev && current === 0)) {
      // Next
      const outIndex = prev ? prev - 1 : datas.length - 1;
      const arr = Array.from({ length: datas.length }, () => 0);
      positions.forEach((v, i) => {
        itemsRefs.current[i].style.opacity = "1";
        itemsRefs.current[i].style.transform = `translateX(${v - 100}%)`;
        arr[i] = v - 100;
      });
      itemsRefs.current[outIndex].style.opacity = "0";
      itemsRefs.current[outIndex].style.transform = `translateX(${arr[outIndex] + 100 * datas.length}%)`;
      arr[outIndex] = arr[outIndex] + 100 * datas.length;
      setPrev(current);
      setPositions(arr);
    }
  }, [current]);

  return (
    <div id={styles.container}>
      <div id={styles.items_infinite}>
        {datas && datas.map((v, i) => <Item key={`${v}_${i}`} data={v} index={i} ref={(el) => (itemsRefs.current[i] = el)} />)}
      </div>
    </div>
  );
};

const CarouselInfinite = (props) => {
  const [current, setCurrent] = useState(0);

  const onClickNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % props.datas.length);
  }, []);
  const onClickPrev = useCallback(() => {
    setCurrent((prev) => (prev ? prev - 1 : props.datas.length - 1));
  }, []);

  return (
    <>
      <Container {...props} current={current} />
      <Controller onClickNext={onClickNext} onClickPrev={onClickPrev} />
    </>
  );
};

export default CarouselInfinite;
