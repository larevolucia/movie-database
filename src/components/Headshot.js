export default function Headshot({ imageUrl, altText }) {
  return <img src={imageUrl} alt={altText} className="img-headshot" />;
}
