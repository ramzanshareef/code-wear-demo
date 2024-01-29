import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const profile = () => {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push(process.env.NEXT_PUBLIC_HOST)
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