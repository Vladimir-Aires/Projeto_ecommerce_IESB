import Pagina from "@/components/Pagina";
import { Carousel, Row } from "react-bootstrap";

export default function page() {


    // const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    return (
        <Pagina titulo={"Início"}>
            {/* <Carousel>
                {produtos.map((produto) => (
                    <Carousel.Item interval={1000}>
                        <ExampleCarouselImage text={produto.foto} />
                        <Carousel.Caption>
                            <h3>{produto.tipo}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel> */}
        </Pagina>
    );
}
