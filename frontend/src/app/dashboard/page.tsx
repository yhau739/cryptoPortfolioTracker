"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faChartLine, faWallet, faExchangeAlt, faChartPie, faCog, faArrowLeft, faSearch, faBell, faTrophy, faCoins } from '@fortawesome/free-solid-svg-icons';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Loading from '@/components/custom/loader';
// import AddTransactionFloatingBtn from "@/components/ui/addTxnFloatBtn";
import { AddTransactionModal } from "@/components/custom/addTransactionModal";
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/custom/sidebar'
import MobileBlocker from '@/components/custom/mobileBlocker';

const baseURL = process.env.NEXT_PUBLIC_DOTNET_API_BASE_URL;

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true); // ✅ Add loading state
    const [activeNav, setActiveNav] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const router = useRouter();

    // referencing the HTML Components
    const priceChartRef = useRef<HTMLDivElement>(null);
    const distributionChartRef = useRef<HTMLDivElement>(null);

    // Define transaction interface
    interface Transaction {
        id: number;
        type: string;
        asset: string;
        amount: string;
        value: string;
        date: string;
    }

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const hasFetched = useRef(false); // Prevents extra API calls

    // initialize portfolio data constant
    const [portfolioData, setPortfolioData] = useState({
        totalPortfolioValue: 0,
        change24h: 0,
        change24hPercent: 0,
        totalAssets: 0,
        bestPerformer: '',
        bestPerformance: 0
    });

    // initialize the btc price data constant
    const [btcPriceData, setBtcPriceData] = useState({ dates: [], prices: [] });

    const handleLogout = () => {
        // const router = useRouter();
        localStorage.removeItem("sessionId"); // Remove session ID from local storage
        router.push("/"); // Redirect to main page
    }

    // declare fn to update chart
    const updatePieChart = (data: { percentage: number; symbol: string }[]) => {
        if (distributionChartRef.current) {
            const chart = echarts.init(distributionChartRef.current);

            // Convert API response into ECharts-friendly format
            const chartData = data.map(item => ({
                value: item.percentage, // Ensure proper percentage format
                name: item.symbol
            }));

            const option = {
                animation: false,
                tooltip: {
                    trigger: 'item',
                    formatter: (params: any) => {
                        return `${params.marker} ${params.name}&nbsp;&nbsp;<strong>${params.value}%</strong>`;
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: '0%',
                    top: 'center'
                },
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false
                    },
                    data: chartData, // Set data dynamically
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };

            chart.setOption(option);
            chart.resize();
        }
    };


    useEffect(() => {
        // run async to fetch data while component is mounted
        async function fetchAllAPIs() {
            try {
                const sessionId = localStorage.getItem("sessionId"); // Retrieve session ID from local storage
                const headers = {
                    "Content-Type": "application/json",
                    ...(sessionId && { "X-Session-ID": sessionId }) // Only add if sessionId exists
                };

                if (process.env.NODE_ENV !== "production") {
                    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                }
                // Ignore SSL verification

                // Fetch all APIs in parallel
                const [portfolioRes, assetRes, btcRes, transactionsRes] = await Promise.all([
                    fetch(`${baseURL}/api/users/portfolio-summary`, {
                        credentials: "include",
                        headers: headers
                    }),
                    fetch(`${baseURL}/api/users/asset-distribution`, { credentials: "include", headers: headers }),
                    fetch(`${baseURL}/api/Binance/btc-price-history`),
                    fetch(`${baseURL}/api/users/transactions`, { credentials: "include", headers: headers }),
                ]);

                // Check for 401 responses
                const responses = [portfolioRes, assetRes, btcRes, transactionsRes];
                const unauthorized = responses.some(res => res.status === 401);

                if (unauthorized) {
                    toast.error("Session expired. Please log in again.");
                    localStorage.removeItem("sessionId"); // clean up
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1500); // wait for toast to be seen
                    return;
                }

                // if any responses not ok, show error toast
                if (!portfolioRes.ok || !assetRes.ok || !btcRes.ok || !transactionsRes.ok) {
                    toast.error("Failed to fetch data from one or more APIs");
                    throw new Error("One or more API requests failed");
                }

                toast.success("Dashboard data loaded successfully!"); // Show success toast

                // Parse API responses
                const portfolioData = await portfolioRes.json();
                const assetData = await assetRes.json();
                const btcData = await btcRes.json();
                // console.log(btcData);
                const transactionsData = await transactionsRes.json();

                // Update states
                setPortfolioData({
                    totalPortfolioValue: portfolioData.totalPortfolioValue,
                    change24h: portfolioData.change24h,
                    change24hPercent: portfolioData.change24hPercent,
                    totalAssets: portfolioData.totalAssets,
                    bestPerformer: portfolioData.bestPerformer,
                    bestPerformance: portfolioData.bestPerformance
                });

                // console.log(assetData.assetDistribution);
                const formatAssetDistribution = assetData.assetDistribution.map(
                    (asset: { percentage: number; }) => ({
                        ...asset,
                        percentage: parseFloat(asset.percentage.toFixed(2))// Ensure percentage is a 2 decimal points number
                    })
                );

                // console.log(formatAssetDistribution);
                updatePieChart(formatAssetDistribution);

                setBtcPriceData({
                    dates: btcData.map((entry: { date: string }) => entry.date),
                    prices: btcData.map((entry: { price: number }) => entry.price)
                });

                setTransactions(transactionsData);

            } catch (error) {
                console.error("Error fetching APIs:", error);
            } finally {
                setIsLoading(false); // Hide loading state after everything is loaded
            }
        }

        // make sure API isnt fetched double times on component mount
        if (!hasFetched.current) {
            fetchAllAPIs();
            hasFetched.current = true; // Prevents extra API call
        }
    }, []);

    // line charts
    useEffect(() => {
        if (priceChartRef.current && btcPriceData.dates.length > 0) {
            const chart = echarts.init(priceChartRef.current);

            chart.setOption({
                animation: false,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: btcPriceData.dates,
                    axisLine: { lineStyle: { color: '#4B5563' } }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { lineStyle: { color: '#4B5563' } }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: (params: any) => {
                        let data = params[0];
                        return `${data.axisValue}<br/>
                            <span style="color:${data.color}">●</span>
                            <b>$${data.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b>`;
                    }
                },
                series: [{
                    data: btcPriceData.prices,
                    type: 'line',
                    smooth: true,
                    lineStyle: { color: '#2563EB' },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(37, 99, 235, 0.2)' },
                                { offset: 1, color: 'rgba(37, 99, 235, 0)' }
                            ]
                        }
                    }
                }]
            });

            // Delay resize to ensure container is fully rendered
            chart.resize(); // Give time for rendering
        }
    }, [btcPriceData]); // Runs whenever btcPriceData changes

    return (
        <>
            {/* Mobile Blocker - only visible on screens smaller than md (768px) */}
            <MobileBlocker />

            {/* Main Dashboard Content */}
            <div className="hidden md:flex min-h-[1024px] bg-gray-50">

                {/* Fullscreen Loading Overlay */}
                <Loading isLoading={isLoading} />
                {/* Slide in Modal Btn */}
                <AddTransactionModal />
                {/* Toast */}
                <Toaster position='top-center' richColors />

                {/* Sidebar */}
                <Sidebar currentPage="dashboard" setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => {
                                    handleLogout();
                                }}
                                data-readdy="true"
                                className="text-gray-600 hover:text-gray-900 hover:text-bold mr-4 transition cursor-pointer"
                                aria-label='Logout'
                                title='Logout'
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                                {isMenuOpen && <span className="ml-2">Logout</span>}
                            </button>
                            <h1 className="text-xl font-semibold">Dashboard</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <Button variant="ghost" size="icon" className="cursor-pointer whitespace-nowrap !rounded-button">
                                <FontAwesomeIcon icon={faBell} className="text-gray-600" />
                            </Button>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <div className="p-6">
                        {/* First row stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {[
                                {
                                    title: 'Total Portfolio Value', value: `$${portfolioData.totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                        }`, change: '+5.2%', icon: faWallet, color: 'text-blue-500', changeColor: 'text-green-500'
                                },
                                { title: '24h Change', value: `$${portfolioData.change24h.toFixed(2)}`, change: `${portfolioData.change24hPercent > 0 ? '+' : ''}${portfolioData.change24hPercent.toFixed(2)}%`, icon: faChartLine, color: 'text-green-500', changeColor: `${portfolioData.change24hPercent > 0 ? 'text-green-500' : 'text-red-500'}` },
                                { title: 'Total Assets', value: `${portfolioData.totalAssets} ${portfolioData.totalAssets === 1 ? 'Coin' : 'Coins'}`, change: '1 Active Trades', icon: faCoins, color: 'text-purple-500', changeColor: 'text-green-500' },
                                { title: 'Best Performer', value: portfolioData.bestPerformer, change: `${portfolioData.bestPerformance > 0 ? '+' : ''}${portfolioData.bestPerformance.toFixed(2)}%`, icon: faTrophy, color: 'text-yellow-500', changeColor: `${portfolioData.bestPerformance > 0 ? 'text-green-500' : 'text-red-500'}` }
                            ].map((stat, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow gap-0">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                                        <FontAwesomeIcon icon={stat.icon} className={`${stat.color} text-xl`} />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <p className={`text-sm ${stat.changeColor}`}>{stat.change}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Second row stats */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Price Chart */}
                            <Card>
                                <CardHeader className='flex-row'>
                                    <FontAwesomeIcon className='text-orange-500' icon={faBitcoin} />
                                    <CardTitle>Price in USD</CardTitle>
                                </CardHeader>
                                <CardContent className='w-full'>
                                    <div className='my-chart-container w-[100%] h-[300px]' ref={priceChartRef}></div>
                                </CardContent>
                            </Card>

                            {/* Asset Distribution */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Asset Distribution</CardTitle>
                                </CardHeader>
                                <CardContent className='w-full'>
                                    <div ref={distributionChartRef} style={{ height: '300px', width: '100%' }}></div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Table for Transactions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                            </CardHeader>
                            <CardContent className='w-full'>
                                <ScrollArea className="h-[400px]">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Asset</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Value</TableHead>
                                                <TableHead>Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {transactions.map(tx => (
                                                <TableRow key={tx.id}>
                                                    <TableCell>
                                                        <span className={`px-2 py-1 rounded-full text-sm ${tx.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                            }`}>
                                                            {tx.type}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>{tx.asset}</TableCell>
                                                    <TableCell>{tx.amount}</TableCell>
                                                    <TableCell>{tx.value}</TableCell>
                                                    <TableCell>{tx.date}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}