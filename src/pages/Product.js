import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

export function Product() {
  // Preluam parametrul din URL.
  let { id } = useParams();
  // In url, id-ul este codificat cu functia encodeURI. Il decodam.
  id = decodeURI(id);
  // Cerem produsul de la API si actualizam state-ul.
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?id=${id}`)
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      });
  }, [id]);

  // Extragem datele de inters din produs.
  const productInfo = product.gameInfo || {};
  const { thumb, name, salePrice, retailPrice } = productInfo;

  return (
    // Afisam datele despre produs pe ecran.
    <div className="d-flex my-3">
      <div className="w-50">
        <div>
          <img src={thumb} alt="" />
        </div>
        <h1>{name}</h1>
      </div>
      <div className="w-50">
        <p>Preț întreg: {retailPrice}$</p>
        <p>
          Preț redus: <span className="text-danger">{salePrice}$</span>
        </p>
        <Button variant="success">Adaugă în coș</Button>
        <Button variant="outline-info">Adaugă la favorite</Button>
      </div>
    </div>
  );
}
