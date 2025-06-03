import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm">About Us</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our mission is to simplify crypto investing
              </h2>
              <p className="max-w-[600px] text-slate-500 md:text-xl/relaxed">
                We started this project with a simple goal: make cryptocurrency portfolio tracking accessible to
                everyone, from beginners to experienced traders.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-slate-100 p-1">
                  <svg
                    className="h-6 w-6 text-slate-800"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Founded in 2023</h3>
                  <p className="text-slate-500">
                    Our team of crypto enthusiasts came together to build the tool we wished existed.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-slate-100 p-1">
                  <svg
                    className="h-6 w-6 text-slate-800"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">User-Focused Development</h3>
                  <p className="text-slate-500">Every feature we build is based on real user feedback and needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-slate-100 p-1">
                  <svg
                    className="h-6 w-6 text-slate-800"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Growing Community</h3>
                  <p className="text-slate-500">
                    Join thousands of users who trust our platform for their crypto tracking needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="#team"
                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Image
                  alt="Team member working"
                  className="rounded-lg object-cover"
                  height={200}
                  src="/placeholder.svg?height=200&width=200"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width={200}
                />
                <Image
                  alt="Office environment"
                  className="rounded-lg object-cover"
                  height={200}
                  src="/placeholder.svg?height=200&width=200"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width={200}
                />
              </div>
              <div className="mt-6 space-y-4">
                <Image
                  alt="Team collaboration"
                  className="rounded-lg object-cover"
                  height={200}
                  src="/placeholder.svg?height=200&width=200"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width={200}
                />
                <Image
                  alt="Product development"
                  className="rounded-lg object-cover"
                  height={200}
                  src="/placeholder.svg?height=200&width=200"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width={200}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16" id="team">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Team</h2>
              <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The passionate people behind our cryptocurrency portfolio tracker.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <Image
                alt="Team Member"
                className="rounded-full object-cover"
                height={120}
                src="/placeholder.svg?height=120&width=120"
                style={{
                  aspectRatio: "120/120",
                  objectFit: "cover",
                }}
                width={120}
              />
              <div className="space-y-1 text-center">
                <h3 className="text-xl font-bold">Alex Johnson</h3>
                <p className="text-sm text-slate-500">Founder & CEO</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Image
                alt="Team Member"
                className="rounded-full object-cover"
                height={120}
                src="/placeholder.svg?height=120&width=120"
                style={{
                  aspectRatio: "120/120",
                  objectFit: "cover",
                }}
                width={120}
              />
              <div className="space-y-1 text-center">
                <h3 className="text-xl font-bold">Sarah Chen</h3>
                <p className="text-sm text-slate-500">Lead Developer</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Image
                alt="Team Member"
                className="rounded-full object-cover"
                height={120}
                src="/placeholder.svg?height=120&width=120"
                style={{
                  aspectRatio: "120/120",
                  objectFit: "cover",
                }}
                width={120}
              />
              <div className="space-y-1 text-center">
                <h3 className="text-xl font-bold">Michael Rodriguez</h3>
                <p className="text-sm text-slate-500">Product Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
