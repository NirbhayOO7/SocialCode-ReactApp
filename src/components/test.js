import { useEffect, useState } from "react";
import Loader from "./Loader";

export const Test = () => {
    const [loading, setLoading] = useState(true);
    console.log("Testing");

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    if (loading) {
        return <Loader />
    }
    return (
        <>
            <h2>Testing</h2>
        </>
    );
}