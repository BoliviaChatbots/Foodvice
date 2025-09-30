// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
//import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './Sliderestaurantes.css';

// import required modules
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import Cardslide from './Cardslide';
import ParticleBackground from './ParticleBackground';
import FoodParticles from './FoodParticles';
import TitleSlide from './TitleSlide';
import restaurants from "../data/resto.json";

const Sliderestaurantes = () => {
    return (
        <>
            <TitleSlide text="Nuestras Ofertas 🎁" />
            <div className='swiper-wrap'>

                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,   //Rotacion de la card
                        stretch: -10, //Separacion entre imag
                        depth: 0,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{        //Auto Desplazar
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={false} //Puntitos en la base para mover
                    navigation={false} //Iconos en Izq y Der para desplazar
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}

                >
                    {restaurants.map((item) => (

                        <SwiperSlide className='card-resto-wrap'>
                            <div id='card-resto' className='card-resto'>
                                <img src="/restaurantes/food-1.jpg" alt="" className='img-bg' />
                                <div className="title">
                                    <h1>{item.titulo}</h1>
                                </div>
                                <div className="content">
                                    <div className="score">8.5</div>
                                    <box-icon type='solid' name='heart' color="red" size='lg' border='circle' className='like-icon bx-burst-hover'></box-icon>
                                    <div className="text">
                                        <h2>{item.titulo}</h2>
                                        <p>{item.direccion}</p>
                                    </div>
                                    <div className="genre">
                                        <span style={{ "--i": 1 }}>des 30%</span>
                                        <span style={{ "--i": 2 }}>Reservar</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <SwiperSlide className='card-resto-wrap'>
                        <div id='card-resto' className='card-resto'>
                            <img src="/restaurantes/food-2.jpg" alt="" className='img-bg' />
                            <div className="title">
                                <h1>Rocky</h1>
                            </div>
                            <div className="content">
                                <div className="score">9.0</div>
                                <box-icon type='solid' name='heart' color="red" size='lg' border='circle' className='like-icon bx-burst-hover'></box-icon>
                                <div className="text">
                                    <h2>Rocky</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                </div>
                                <div className="genre">
                                    <span style={{ "--i": 1 }}>promo 3x2</span>

                                    <span style={{ "--i": 2 }}>Reservar</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='card-resto-wrap'>
                        <div id='card-resto' className='card-resto'>
                            <img src="/restaurantes/food-3.jpg" alt="" className='img-bg' />
                            <div className="title">
                                <h1>Bambi</h1>
                            </div>
                            <div className="content">
                                <div className="score">5.0</div>
                                <box-icon type='solid' name='heart' color="#f1c40f" size='lg' border='circle' className='like-icon bx-burst-hover'></box-icon>
                                <div className="text">
                                    <h2>Bambi</h2>
                                    <p>Incidunt molestias dicta ullam minus necessitatibus</p>
                                </div>
                                <div className="genre">
                                    <span style={{ "--i": 1 }}>Big Friday Sale!</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='card-resto-wrap'>
                        <div id='card-resto' className='card-resto'>
                            <img src="/restaurantes/food-4.jpg" alt="" className='img-bg' />
                            <div className="title">
                                <h1>The Bear</h1>
                            </div>
                            <div className="content">
                                <div className="score">8.5</div>
                                <box-icon type='solid' name='heart' size='lg' border='circle' className='like-icon bx-burst-hover d-none'></box-icon>
                                <div className="text">
                                    <h2>The Bear</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                                </div>
                                <div className="genre">
                                    <span style={{ "--i": 1 }}>desc 10%</span>
                                    <span style={{ "--i": 2 }}>Black Friday</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='card-resto-wrap'>
                        <div id='card-resto' className='card-resto'>
                            <img src="/restaurantes/food-5.jpg" alt="" className='img-bg' />
                            <div className="title">
                                <h1>Pollos Rocky II</h1>
                            </div>
                            <div className="content">
                                <div className="score">9.0</div>
                                <box-icon type='solid' name='heart' size='lg' border='circle' className='like-icon bx-burst-hover'></box-icon>
                                <div className="text">
                                    <h2>Pollos Rocky II</h2>
                                    <p>Calle Mataral #330 Barrio Santa Rosita Frente al Coliseo Santa Rosita</p>
                                </div>
                                <div className="genre">
                                    <span style={{ "--i": 1 }}>desc 5%</span>
                                    <span style={{ "--i": 2 }}>Sorteo!</span>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='card-resto-wrap'>
                        <div id='card-resto' className='card-resto'>
                            <img src="/restaurantes/food-1.jpg" alt="" className='img-bg' />
                            <div className="title">
                                <h1>Sabor Cochabambino</h1>
                            </div>
                            <div className="content">
                                <div className="score">8.5</div>
                                <box-icon name='smile' size='lg' border='circle' className='like-icon bx-burst-hover'></box-icon>
                                <div className="text">
                                    <h2>Sabor Cochabambino</h2>
                                    <p>Lorem ipsum dolor sit amet dicta ullam minus necessitatibus. (amet dicta ullam minus necessitatibus)</p>
                                </div>
                                <div className="genre">
                                    <span style={{ "--i": 1 }}>Promo Ptos</span>
                                    <span style={{ "--i": 2 }}>desc 5%</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='card-resto-wrap'>
                        <div id='card-resto' className='card-resto'>
                            <img src="/restaurantes/food-2.jpg" alt="" className='img-bg' />
                            <div className="title">
                                <h1>Rocky</h1>
                            </div>
                            <div className="content">
                                <div className="score">9.0</div>
                                <box-icon type='solid' name='heart' color="red" size='lg' border='circle' className='like-icon bx-burst-hover'></box-icon>
                                <div className="text">
                                    <h2>Rocky</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                </div>
                                <div className="genre">
                                    <span style={{ "--i": 1 }}>desc 30%</span>


                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='card-resto-wrap'>
                        <div id='card-resto' className='card-resto'>
                            <img src="/restaurantes/food-3.jpg" alt="" className='img-bg' />
                            <div className="title">
                                <h1>Bambi</h1>
                            </div>
                            <div className="content">
                                <div className="score">5.0</div>
                                <box-icon type='solid' name='heart' color="#f1c40f" size='lg' border='circle' className='like-icon bx-burst-hover'></box-icon>
                                <div className="text">
                                    <h2>Bambi</h2>
                                    <p>Incidunt molestias dicta ullam minus necessitatibus</p>
                                </div>
                                <div className="genre">
                                    <span style={{ "--i": 1 }}>desc 35%</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='card-resto-wrap'>
                        <div id='card-resto' className='card-resto'>
                            <img src="/restaurantes/food-4.jpg" alt="" className='img-bg' />
                            <div className="title">
                                <h1>The Bear</h1>
                            </div>
                            <div className="content">
                                <div className="score">8.5</div>
                                <box-icon type='solid' name='heart' size='lg' border='circle' className='like-icon bx-burst-hover d-none'></box-icon>
                                <div className="text">
                                    <h2>The Bear</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                                </div>
                                <div className="genre">
                                    <span style={{ "--i": 1 }}>desc 25%</span>
                                    <span style={{ "--i": 2 }}>Reservar</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </>
    );
}

export default Sliderestaurantes;