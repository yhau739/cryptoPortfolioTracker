"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";



export default function Hero() {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const heroImage = './hero_image.png';

    return (
        <section className="pt-32 pb-20 px-8 relative overflow-hidden">
            <div className="flex flex-col-reverse container mx-auto md:grid md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col md:block space-y-8">
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                        Effortless Crypto Portfolio Management
                    </h1>
                    <p className="text-xl text-gray-600">
                        Track, analyze, and trade smarter with real-time price updates.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <Link href="/register">
                            <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-lg px-7 py-6 !rounded-button whitespace-nowrap">
                                Start Growing Your Portfolio
                            </Button>
                        </Link>
                        <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="hover:cursor-pointer text-lg px-8 py-6 !rounded-button whitespace-nowrap">
                                    <FontAwesomeIcon icon={faPlay} className="fas ml-1 mr-2" /> Watch Demo
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-full max-w-6xl">
                                <DialogHeader>
                                    <DialogTitle>How CryptoTrack Works</DialogTitle>
                                </DialogHeader>
                                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                                    <video
                                        controls
                                        className="w-full h-full rounded-lg"
                                        poster="/videos/video-thumbnail.jpg" // Optional thumbnail
                                    >
                                        <source src="/videos/demo.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src={heroImage}
                        alt="Trading Platform Interface"
                        className="rounded-2xl shadow-2xl"
                    />
                    {/* <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div> */}
                </div>
            </div>
        </section>
    );
}
