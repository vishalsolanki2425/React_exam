import "./Movie_slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Movie_slider() {
    const banners = [
        {
            id: 1,
            image: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1752046300471_paddingtondesktop.jpg",
            alt: "Flash Sale"
        },
        {
            id: 2,
            image: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1744872843193_revplaycard1240x300.jpg",
            alt: "Paddington In Peru"
        },
        {
            id: 3,
            image: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1752130122398_maalikdesktop.jpg",
            alt: "LIV Card Offer"
        }
    ];

    return (
        <div className="banner-slider">
            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 2500 }}
                loop
                spaceBetween={20}
                slidesPerView={1}
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <img src={banner.image} alt={banner.alt} className="banner-image" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Movie_slider;