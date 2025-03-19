import LoginForm from "@/components/custom/loginForm";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Suspense } from "react";
import Loading from "../loading";


export default function Login() {
    return (
        <>
            <Header />

            {/* Wrap ONLY RegisterForm in Suspense */}
            <Suspense fallback={<Loading />}>
                <LoginForm />
            </Suspense>

            <Footer />
        </>
        // <Suspense fallback={<Loading />}>
        //     <Header />
        //     <LoginForm />
        //     <Footer />
        // </Suspense>
    );
}