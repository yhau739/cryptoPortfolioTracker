import RegisterForm from "@/components/custom/registerForm";
import { Suspense } from "react";
import Loading from "../loading";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function RegisterPage() {
    return (
        <>
            <Header />

            {/* Wrap ONLY RegisterForm in Suspense */}
            <Suspense fallback={<Loading />}>
                <RegisterForm />
            </Suspense>

            <Footer />
        </>
        // <Suspense fallback={<Loading />}>
        //     <Header />
        //     <RegisterForm />
        //     <Footer />
        // </Suspense>
    );
}