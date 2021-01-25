import React, { memo, useState, useCallback, useEffect } from 'react';
import { Image } from '@tarojs/components';
import { isSupportWebp } from '@/utils/tools';

const nopicImage = 'https://ydcx.360buyimg.com/img/ts.png';
// TODO bug lazyload = true 时 src 无法修改
export default memo((props) => {
  const { src, errorSrc = nopicImage, lazyLoad = true } = props;

  const [currentSrc, setCurrentSrc] = useState(src || nopicImage);
  // const [currentLazyLoad, setCurrentLazyLoad] = useState();

  const handleError = useCallback(() => {
    // setCurrentLazyLoad(false);
    if (!errorSrc || errorSrc === nopicImage) {
      if (src !== nopicImage) {
        setCurrentSrc(nopicImage);
      }
    } else {
      if (src !== errorSrc) {
        setCurrentSrc(errorSrc);
      } else {
        setCurrentSrc(nopicImage);
      }
    }
  }, [errorSrc, src]);

  useEffect(() => {
    // if (log) {
    //   console.log(1111, src)
    // }
    // setCurrentLazyLoad(false);
    setCurrentSrc(src || nopicImage);
  }, [src]);

  // useEffect(() => {
  //   setCurrentLazyLoad(lazyLoad);
  // }, [lazyLoad]);

  return (
    <Image
      {...props}
      lazyLoad={lazyLoad}
      webp={isSupportWebp}
      onError={handleError}
      src={currentSrc}
    />
  );
});
