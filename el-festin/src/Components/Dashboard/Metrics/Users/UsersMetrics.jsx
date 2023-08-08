import React, {useState} from "react";
import style from '../metrics.module.css'
import { useSelector } from "react-redux";
import DefaultImg from './images/profile.png'
import axios from "axios";
import Swal from "sweetalert2";
import { server } from "../../../../Helpers/EndPoint";
import { Card, Text,  Col, Grid, Title,  Table, TableCell, TableHeaderCell, TableHead, TableBody, TableRow, Badge} from "@tremor/react";


export const UsersMetrics = () => {
  const [selectedRole, setSelectedRole] = useState("");
    const AllUsers = useSelector((state) => state.users.users)

     // Estado para controlar la página actual y la cantidad de usuarios por página
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;
  const [pageNumberLimit] = useState(5); //Este es el estado local del limite de paginas el cual se puede modificar
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);//Con este estado local determino la ultima pagina a mostrar en la paginacion, este tiene un "set" para que este se pueda ir modificando 
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);//Con este estado local determino la primera pagina a mostrar en la paginacion, este tiene un "set" para que este se pueda ir modificando 
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(AllUsers.length / usersPerPage); i++) {
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
  

  // Cálculo para determinar qué usuarios se muestran en la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = AllUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Función para cambiar la página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleRoleChange = async (userId) => {
    if(userId){
    try {
      const response = await axios.put(`${server}/user/${userId}`, {
        role: selectedRole,
      });

      if (response.status === 200) {

        Swal.fire({
          icon: "success",
          title: "Rol cambiado exitosamente",
          confirmButtonText: "OK",
        })
        console.log("Rol cambiado exitosamente.");
      } else {
        console.error("Error al cambiar el rol del usuario.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }
  };

    return(
        <div className={style.contUserM}>
             <Grid numItems={1}  className="gap-2">
    <Col numColSpan={1}>
  <Card decoration="top" className="mt-2" >
    <Title>Lista de usuarios Registrados en la aplicacion</Title>
    <Table >
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Imagen</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Rol</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {currentUsers.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <div >
             <img className={style.contImg} src={item.image || DefaultImg} alt="NoImage" />
                </div></TableCell>
                <TableCell>
                    <Text>{item.email}</Text>
                </TableCell>
                <TableCell>
                  <div className={style.btnContainer}>
               {item.role === 'User' ? <select className={style.selectButn}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Rol: {item.role}</option>
          <option select disabled>Cambia el rol</option>
          <option value="Admin">Admin</option>
        </select> 
        : item.role === 'Admin' ?  <select className={style.selectButn}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        <option value="">Rol: {item.role}</option>
        <option select disabled>Cambia el rol</option>
        <option value="User">Usuario</option>
        <option value="SuperAdmin">Super Admin</option>
      </select> : <select className={style.selectButn}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        <option value="">Rol: {item.role}</option>
        <option select disabled>Cambia el rol</option>
        <option value="User">Usuario</option>
        <option value="Admin">Admin</option>
      </select>}
                  <button className={style.buuutton} onClick={() => handleRoleChange(item.id)}>Cambiar Rol</button>
                  </div>
                </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div>
      <Text>Actual page: {currentPage}</Text>
    </div>
    <div className={style.contPag}>
     <button className={style.page} onClick={handlePrev}>Prev</button>
            {Array.from({ length: Math.ceil(AllUsers.length / usersPerPage) }).map((_, index) => (
              <button className={style.page} key={index} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            ))}
            <button className={style.page} onClick={handleNext}>Next</button>
          </div>
  </Card>
  </Col>
  </Grid>
        </div>
    )
} 