import backgroundImage from '../../public/main.jpg'

function HeroSection() {
  return (
    <div
      className="bg-cover bg-center min-h-screen min-w-full absolute top-1"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }} >

    </div>
  );
}



export default HeroSection