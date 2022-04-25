import { Swiper } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';


const Slider = ({ children, settings }) => {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      grabCursor={true}
      breakpoints={settings}
      modules={[Pagination]}
      className="mySwiper">
      {children}
    </Swiper>
  );
};

export default Slider;
