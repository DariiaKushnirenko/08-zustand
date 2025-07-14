import Link from "next/link";
import css from "./not-found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Not found',
    description: 'Oops.. this page does not exist',
    openGraph:{
    title: 'Not found',
    description: 'Oops.. this page does not exist',
    url: '',
    images: [
    { url: '/app/not-found.png',
    width: '1200',
    height:'630',
    alt: 'Error image'
        }
    ]
    }
}

const NotFound = () => {
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
            <Link href="/">Go back home</Link>
        </div>
        
    );
};

export default NotFound;