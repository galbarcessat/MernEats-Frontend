import HeroImg from "../assets/hero.png"

export function Hero() {
    return (
        <div>
            <img src={HeroImg} alt="" className="w-full max-h-[600px] object-cover"/>
        </div>
    )
}
