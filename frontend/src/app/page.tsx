"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useState } from 'react';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faExchangeAlt, faChartBar, faCoins, faCopyright, faWater, faGem, faCube, faChartLine, faGlobe, faBolt, faWallet, IconDefinition, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faBitcoin, faEthereum } from "@fortawesome/free-brands-svg-icons";
import 'swiper/css';
import 'swiper/css/pagination';

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import Feature from "@/components/landing/feature";
import Hero from "@/components/landing/hero";
import StatsSection from "@/components/landing/stats";
import FeaturesSection from "@/components/landing/features";
import AboutSection from "@/components/landing/about";

export default function Home() {
    const chartRef = useRef<HTMLDivElement>(null);
    const [activeDemo, setActiveDemo] = useState(0);

    // 🔹 Store floating element positions
    const [floatingPositions, setFloatingPositions] = useState<{ left: string; top: string; duration: string }[]>([]);
    useEffect(() => {
        const generateRandomPositions = () => {
            return Array.from({ length: 10 }).map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                duration: `${5 + Math.floor(Math.random() * 10)}s`, // Random duration 5s - 15s
            }));
        };

        setFloatingPositions(generateRandomPositions());
    }, []); // Runs only once after the component mounts

    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);
            const option = {
                animation: false,
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '70%'],
                        data: [
                            { value: 40, name: 'Bitcoin' },
                            { value: 25, name: 'Ethereum' },
                            { value: 15, name: 'Cardano' },
                            { value: 20, name: 'Others' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            chart.setOption(option);
        }
    }, []);
    return (
        <div>
            <Header />

            <div className="min-h-[1024px] bg-gradient-to-b from-white to-blue-50">
                {/* Hero Section */}
                {/* <div className="relative h-[600px] bg-cover bg-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://public.readdy.ai/ai/img_res/d4826df75005b61d6cd193f8e9f92ac1.jpg')] animate-wave"></div>
                    <style jsx>{`
                        @keyframes wave {
                        0% {
                        background-position: 0% 50%;
                        }
                        50% {
                        background-position: 100% 50%;
                        }
                        100% {
                        background-position: 0% 50%;
                        }
                        }
                        .animate-wave {
                        animation: wave 15s ease infinite;
                        background-size: 120% 120%;
                        }
                    `}</style>
                    <div className="absolute inset-0">
                        {floatingPositions.map((pos, i) => (
                            <div
                                key={i}
                                className="absolute opacity-20"
                                style={{
                                    left: pos.left,
                                    top: pos.top,
                                    animation: `float ${pos.duration} ease-in-out infinite`,
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={i % 2 ? faBitcoin : faEthereum}
                                    className="text-3xl text-blue-400"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10"></div>
                        <div className="container mx-auto px-4 h-full flex items-center">
                            <div className="max-w-2xl relative pl-6 ml-6">
                                <h1 className="text-6xl pb-3 font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600 animate-fade-in">
                                    Effortless Crypto Portfolio Management
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 animate-fade-in-delay">
                                    Turn market volatility into profit opportunities. Track, analyze, and trade smarter with real-time price updates.
                                </p>
                                <div className="flex gap-4 animate-fade-in-delay-2">
                                    <Button
                                        className="!rounded-button text-lg px-8 py-6 bg-blue-600 hover:bg-blue-500 cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">Start Growing Your Portfolio</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="!rounded-button text-lg px-8 py-6 cursor-pointer whitespace-nowrap border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:shadow-md"
                                    >
                                        See It in Action
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style jsx>{`
                    @keyframes float-0 {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                    }
                    @keyframes float-1 {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(-10deg); }
                    }
                    @keyframes float-2 {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-25px) rotate(5deg); }
                    }
                    .animate-float-0 { animation: float-0 6s ease-in-out infinite; }
                    .animate-float-1 { animation: float-1 7s ease-in-out infinite; }
                    .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
                    .animate-fade-in { animation: fadeIn 1s ease-out; }
                    .animate-fade-in-delay { animation: fadeIn 1s ease-out 0.3s both; }
                    .animate-fade-in-delay-2 { animation: fadeIn 1s ease-out 0.6s both; }
                    @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                    }
                    `}</style>
                </div> */}
                <Hero />
                {/* <AboutSection /> */}
                {/* Exchange Integration Section */}
                <div className="py-12 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-4 mb-8 text-center">
                        <h2 className="text-4xl font-bold text-center pb-4 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600">Seamless Integration with Top Exchanges</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Connect and trade with the world's leading cryptocurrency exchanges</p>
                    </div>
                    <div className="relative">
                        <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                        <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
                        <div className="flex animate-marquee whitespace-nowrap">
                            {[...Array(2)].map((_, containerIndex) => (
                                <div key={containerIndex} className="flex items-center">
                                    {[
                                        { name: 'Binance', icon: faCoins },
                                        { name: 'Coinbase', icon: faCopyright },
                                        { name: 'Kraken', icon: faWater },
                                        { name: 'Gemini', icon: faGem },
                                        { name: 'KuCoin', icon: faCube },
                                        { name: 'Bitfinex', icon: faChartLine },
                                        { name: 'Huobi', icon: faGlobe },
                                        { name: 'FTX', icon: faBolt }
                                    ].map((exchange, idx) => (
                                        <div
                                            key={`${containerIndex}-${idx}`}
                                            className="mx-12 flex items-center group transition-all duration-300 cursor-pointer"
                                        >
                                            <div className="w-32 h-32 flex flex-col items-center justify-center rounded-xl bg-gray-50 group-hover:bg-blue-50 group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300">
                                                {/* <i className={`fas ${exchange.icon} text-4xl text-gray-400 group-hover:text-blue-600 transition-colors duration-300`}></i> */}
                                                <FontAwesomeIcon icon={exchange.icon} className="text-4xl text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                                                <span className="mt-3 text-gray-400 group-hover:text-blue-600 font-medium transition-colors duration-300">{exchange.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <style jsx>{`
    @keyframes marquee {
    0% {
    transform: translateX(0);
    }
    100% {
    transform: translateX(-50%);
    }
    }
    .animate-marquee {
    animation: marquee 40s linear infinite;
    }
    `}</style>
                </div>
                {/* Stats Section */}
                <StatsSection />
                {/* Features Section */}
                <FeaturesSection />
                {/* CTA */}

            </div>

            <Footer />
        </div>
    );
}
