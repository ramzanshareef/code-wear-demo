import { useRouter } from "next/router"

const Slug = () => {
    const router = useRouter();
    const { slug } = router.query;
    return (
        <div>
            <h1>Slug is : {slug}</h1>
        </div>
    )
}

export default Slug