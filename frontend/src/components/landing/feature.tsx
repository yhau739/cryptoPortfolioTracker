"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faTrophy, faRobot } from "@fortawesome/free-solid-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../ui/card";

const feature1Image = 'https://public.readdy.ai/ai/img_res/5d7796d7e881c2cbc1d7689477be02e1.jpg';

const feature2Image = 'https://public.readdy.ai/ai/img_res/341e8cf7bf4945d81b98a659ae4c6f9a.jpg';

const feature3Image = 'https://public.readdy.ai/ai/img_res/39c7da6e24587705d37be1bc8d2d9556.jpg';

const feature4Image = '/realtime-market-data.png';

export default function Feature() {
    return (
        <section className="py-20 px-8 bg-gray-50 mx-3" id="features">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Why Choose CryptoTrack?</h2>
                    <p className="text-xl text-gray-600">Experience the most advanced crypto portfolio tracking platform</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex justify-center w-full">
                            <div className="h-68 rounded-lg overflow-hidden">
                                <img src={feature1Image} alt="Live Trading" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold">
                            <FontAwesomeIcon className="fas text-blue-600 mr-3" icon={faChartLine} />
                            Real Time Market Updates
                        </h3>
                        <p className="text-gray-600">
                            Record your trades with real-time market data and experience authentic market conditions without financial risk.
                        </p>
                    </Card>

                    <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex justify-center w-full">
                            <div className="h-68 rounded-lg overflow-hidden">
                                <img src={feature2Image} alt="Analytics" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold">
                            <FontAwesomeIcon className="fas text-green-600 mr-3" icon={faRobot} />
                            AI-Powered Insights
                        </h3>
                        <p className="text-gray-600">
                            Get personalized trading suggestions and learn from advanced AI analysis of market trends.
                        </p>
                    </Card>

                    <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex justify-center w-full">
                            <div className="h-68 rounded-lg overflow-hidden">
                                <img src={feature3Image} alt="Competition" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold">
                            <i className="fas fa-trophy text-yellow-600 mr-3"></i>
                            <FontAwesomeIcon className="fas text-yellow-600 mr-3" icon={faTrophy} />
                            Compete & Earn Rewards
                        </h3>
                        <p className="text-gray-600">
                            Join trading competitions, climb the leaderboards, and win exciting prizes.
                        </p>
                    </Card>

                    <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex justify-center w-full">
                            <div className="h-68 rounded-lg overflow-hidden">
                                <img src={feature4Image} alt="Live Market" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold">
                            <FontAwesomeIcon className="fas text-purple-600 mr-3" icon={faDatabase} />
                            Live Market Data
                        </h3>
                        <p className="text-gray-600">
                            Access real-time cryptocurrency prices and market data from multiple exchanges.
                        </p>
                    </Card>
                </div>
            </div>
        </section>
    );
}