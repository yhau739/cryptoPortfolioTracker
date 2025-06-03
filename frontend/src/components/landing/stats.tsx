

"use client";

// import Link from "next/link";
// import { Button } from "../ui/button";

// export default function CTA() {
//     return (
//         <section id="contactMe" className="py-20 px-8 bg-blue-600 text-white">
//             <div className="container mx-auto text-center">
//                 <h2 className="text-4xl font-bold mb-6">Ready to Start Your Trading Journey?</h2>
//                 <p className="text-xl mb-8 opacity-90">Join thousands of traders who are mastering crypto trading risk-free</p>
//                 <Link href="/register">
//                     <Button className="bg-white text-blue-600 hover:bg-gray-200 hover:cursor-pointer text-lg px-8 py-6 !rounded-button whitespace-nowrap">
//                         Create Free Account
//                     </Button>
//                 </Link>
//             </div>
//         </section>
//     );
// }

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function StatsSection() {
  return (
    <section id="stats" className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Start tracking your crypto portfolio today
            </h2>
            <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of investors who trust our platform to track and manage their cryptocurrency investments.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            {/* <form className="flex flex-col sm:flex-row gap-2">
              <Input
                className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                placeholder="Enter your email"
                type="email"
                required
              />
              <Button type="submit" className="bg-white text-slate-900 hover:bg-slate-100">
                Get Started
              </Button>
            </form> */}
          </div>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-slate-700 bg-slate-800 p-6 text-center">
            <div className="text-4xl font-bold">10K+</div>
            <p className="text-slate-300">Active Users</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-slate-700 bg-slate-800 p-6 text-center">
            <div className="text-4xl font-bold">$500M+</div>
            <p className="text-slate-300">Assets Tracked</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border border-slate-700 bg-slate-800 p-6 text-center">
            <div className="text-4xl font-bold">100+</div>
            <p className="text-slate-300">Supported Cryptocurrencies</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-4">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-slate-900 shadow transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50"
            >
              Sign Up Now
            </Link>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-slate-700 bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50"
            >
              Learn More
            </Link>
          </div>
                      <p className="text-xs text-slate-400">
              By signing up, you agree to our{" "}
              <Link href="#" className="underline underline-offset-2 hover:text-white">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline underline-offset-2 hover:text-white">
                Privacy Policy
              </Link>
              .
            </p>
        </div>
      </div>
    </section>
  )
}
