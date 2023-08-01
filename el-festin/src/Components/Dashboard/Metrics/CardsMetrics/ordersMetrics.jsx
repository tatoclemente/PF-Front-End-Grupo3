import React,{useState} from "react";
 import style from '../metrics.module.css'
// import { useSelector } from "react-redux";
import { Card, BarChart, Title, Subtitle, Col, Grid, Text } from "@tremor/react";

const platosMasVendidos = [
    {
        name:'Milanesa',
        'CuantitySelled': 10
    },
    {
        name:'Pollo',
        'CuantitySelled': 30
    },
    {
        
         name:'Pucho y cafe',
         'CuantitySelled': 1
         
    },
    {
        
        name:'Fideos de mama',
        'CuantitySelled': 5
        
   },
   {
        
    name:'Salmon',
    'CuantitySelled': 7
    
},
{
        
    name:'pescado',
    'CuantitySelled': 8
    
},
{
  name:'Ravioles',
'CuantitySelled': 10,
},
{
  name:'Turron',
  'CuantitySelled': 20
},
{
  name:'Master',
  'CuantitySelled': 16
}

]
const ITEMS_PER_PAGE = 6;


export const OrderMetrics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberLimit] = useState(5); //Este es el estado local del limite de paginas el cual se puede modificar
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);//Con este estado local determino la ultima pagina a mostrar en la paginacion, este tiene un "set" para que este se pueda ir modificando 
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);//Con este estado local determino la primera pagina a mostrar en la paginacion, este tiene un "set" para que este se pueda ir modificando 
  const pageNumbers = [];

  // Calcula el índice inicial y final de los datos de la página actual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Obtiene los datos de la página actual
  const currentData = platosMasVendidos.slice(startIndex, endIndex);

  for(let i = 1; i <= Math.ceil(platosMasVendidos.length/ ITEMS_PER_PAGE); i++) {
    pageNumbers.push(i)
  }//Con este for voy contando la cantidad de paginas que voy a tener en total

  function handleNext() {
    if(currentPage !== pageNumbers.length){
      setCurrentPage(currentPage + 1)
    }
    
    if(currentPage + 1 >maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }//Con esta funcion paso de una pagina a la otra. Primero pregunto si la pagina acutal no es igual a la cantidad de paginas, si esto es cierto seteo la pagina actual a la siguiente con un mas 1
  //Luego para mostrar las siguientes paginas pregunto si la pagina acutal mas uno es mayor al numero maximo de paginas acutal. Entonces si esto es cierto seteo el limite de paginas minimo y maximo sumando el valor limite de paginas a estas.

  function handlePrev() {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }

      if((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }

    }
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const encontrarPlatoMasVendido = (platos) =>
  platos.reduce(
    (platoMasVendido, plato) =>
      plato['CuantitySelled'] > platoMasVendido['CuantitySelled']
        ? plato
        : platoMasVendido,
    platos[0]
  );

const platoMasVendido = encontrarPlatoMasVendido(platosMasVendidos);

    return(
        <div >
  <Grid numItems={1} numItemsSm={2} className="gap-3">
    <Col numColSpan={1} numColSpanLg={2} >
        <div className={style.containerDishes} >
    <Card decoration="top">
    <Title>Platos mas Vendidos</Title>
    <Subtitle>
     Los platos mas amados por los clientes
    </Subtitle>
    
    <BarChart
      className="mt-6"
      data={currentData}
      index="name"
      categories={['CuantitySelled']}
      colors={["orange"]}
      yAxisWidth={50}
    />
                  <div className={style.contPag} >
                  <button className={style.page}  onClick={handlePrev}> Ant </button>
            
                {Array.from({ length: Math.ceil(platosMasVendidos.length / ITEMS_PER_PAGE) }).map((_, index) => (
              <button className={style.page} key={index} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            ))}
                  <button className={style.page}  onClick={handleNext}> Sig</button>
              </div>
  </Card>
  </div>
  <div className={style.contMostSelled}>
      <Card decoration="top">
        <Text>El plato mas vendido es:</Text>
        <Title>{platoMasVendido.name}</Title>
        <Text>con {platoMasVendido.CuantitySelled} vendidos</Text>
      </Card>
      </div>
    </Col>
  </Grid>
        </div>
    )
}