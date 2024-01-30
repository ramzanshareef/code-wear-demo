import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const profile = () => {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/login")
        }
    }, []);

    return (
        <div>
            <div className="w-4/5 container mx-auto my-4">
                fdf
            </div>
        </div>
    )
}

export default profile