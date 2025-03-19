

"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function CTA() {
    return (
        <section id="contactMe" className="py-20 px-8 bg-blue-600 text-white">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to Start Your Trading Journey?</h2>
                <p className="text-xl mb-8 opacity-90">Join thousands of traders who are mastering crypto trading risk-free</p>
                <Link href="/register">
                    <Button className="bg-white text-blue-600 hover:bg-gray-200 hover:cursor-pointer text-lg px-8 py-6 !rounded-button whitespace-nowrap">
                        Create Free Account
                    </Button>
                </Link>
            </div>
        </section>
    );
}
