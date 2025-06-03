import { Activity, Shield, BarChart3, Zap, Globe, Lock } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything you need to track your crypto
            </h2>
            <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides powerful tools to help you monitor, manage, and maximize your cryptocurrency
              investments.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2">
            <div className="rounded-full bg-slate-100 p-3">
              <Activity className="h-6 w-6 text-slate-800" />
            </div>
            <h3 className="text-xl font-bold">Real-Time Tracking</h3>
            <p className="text-center text-slate-500">
              Monitor cryptocurrency prices in real-time with accurate data from multiple exchanges.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2">
            <div className="rounded-full bg-slate-100 p-3">
              <BarChart3 className="h-6 w-6 text-slate-800" />
            </div>
            <h3 className="text-xl font-bold">Portfolio Management</h3>
            <p className="text-center text-slate-500">
              Track your holdings, analyze performance, and visualize your portfolio allocation.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2">
            <div className="rounded-full bg-slate-100 p-3">
              <Shield className="h-6 w-6 text-slate-800" />
            </div>
            <h3 className="text-xl font-bold">Security First</h3>
            <p className="text-center text-slate-500">
              Your data is encrypted and secure. We never store your private keys or sensitive information.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2">
            <div className="rounded-full bg-slate-100 p-3">
              <Zap className="h-6 w-6 text-slate-800" />
            </div>
            <h3 className="text-xl font-bold">Alerts & Notifications</h3>
            <p className="text-center text-slate-500">
              Set custom price alerts and receive notifications when your conditions are met.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2">
            <div className="rounded-full bg-slate-100 p-3">
              <Globe className="h-6 w-6 text-slate-800" />
            </div>
            <h3 className="text-xl font-bold">Multi Wallets Support</h3>
            <p className="text-center text-slate-500">
              Connect to popular crypto wallets like MetaMask and track all your assets across chains in one place.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2">
            <div className="rounded-full bg-slate-100 p-3">
              <Lock className="h-6 w-6 text-slate-800" />
            </div>
            <h3 className="text-xl font-bold">Tax Reporting</h3>
            <p className="text-center text-slate-500">
              Generate tax reports and export transaction history for easy compliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
