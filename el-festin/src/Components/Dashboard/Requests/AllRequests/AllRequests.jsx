import React from "react";
import style from '../AllRequests.module.css'


import { Card, Text,  Col, Grid, Legend,  Table, TableCell, TableHeaderCell, TableHead, TableBody, TableRow,  Title, Divider} from "@tremor/react";


export const Requests = ({ AllPending, handleDetail }) => {
 
  console.log(AllPending)
    
  
  // Función para cambiar la página
 
    return(
        <div className={style.contUserM}>
             <Grid numItems={1}  className="gap-1">
    <Col numColSpan={1}>
  <Card className="mt-2" >
    <Title>Estado de pedido</Title>
    <div className={style.dotsCont}>
  <Legend 
      categories={[' ']}
      colors={["emerald"]}
    /><span>Completado</span><Legend 
    categories={[' ']}
    colors={["orange"]}
  /><span>En proceso</span>
  </div>
  <Divider/>
    <Table >
      <TableHead>
        <TableRow>
          <TableHeaderCell>Usuario</TableHeaderCell>
          <TableHeaderCell>Num Orden</TableHeaderCell>
          <TableHeaderCell>Horario</TableHeaderCell>
          <TableHeaderCell>Detalle</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {AllPending?.map((item) => (
          <TableRow key={item.order}>
        
                <TableCell>
                    <Text>{item.user.email}</Text>
                    <Text>{item.user.name}</Text>
                </TableCell>
                <TableCell>
                    <Text>{item.order}</Text>
                    {item.status === 'Completo' ? <Legend className="r-3"
      categories={[' ']}
      colors={["emerald"]}
    /> : item.status === 'Pendiente' ? <Legend  className="r-3"
    categories={[' ']}
    colors={["orange"]}
  /> : item.status === 'Entregado' ? <Legend className="r-3"
  categories={[' ']}
  colors={["emerald"]}
/> :<Legend  className="r-3"
  categories={[' ']}
  colors={["red"]}
/> }
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                    <button className={style.detButton} data-value={item.order} onClick={handleDetail}>Detalle</button>
                </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    
  </Card>
  </Col>
  
  </Grid>
  </div>
    
    )
} 