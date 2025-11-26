import { useEffect, useState } from "react";
import BlogPage from '../components/BlogPage'
import Loader from "../components/Loader";


export const Blog = () => {
    const [loading, setLoading] = useState(true);

    // Simular carga real
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>

            <Loader show={loading} />
            <BlogPage />

        </div>
    )
}