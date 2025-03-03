import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { slides } from '@/src/data/ads';
import Image from 'next/image';



const ADSSlider: React.FC = () => {

    return (
        <div className=" mt-3">
            <Swiper
                modules={[EffectFade, Navigation, Autoplay, Pagination]}
                effect="fade"
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full max-w-4xl"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        {({ isActive }) => (
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative aspect-video rounded-lg overflow-hidden shadow-2xl"
                                    >
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            loading='lazy'
                                            quality={75} 
                                            className="absolute inset-0 w-full h-full object-bottom object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 sm:p-8">
                                            <motion.h2
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                                className="sm:text-4xl text-xl merriweather-bold text-[var(--soft-blue)] mb-2 glow"
                                            >
                                                {slide.title}
                                            </motion.h2>
                                            <motion.p
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4, duration: 0.5 }}
                                                className="sm:text-xl text-sm montserrat text-gray-200"
                                            >
                                                {slide.description}
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
}

export default ADSSlider