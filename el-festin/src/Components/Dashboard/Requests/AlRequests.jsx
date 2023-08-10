import React, { useState, useEffect } from "react";
import { DetailReserv } from "./DetailR/DetailR";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../../Helpers/EndPoint";
import style from './AllRequests.module.css'
import { Requests } from "./AllRequests/AllRequests";
import { ordersAccepted } from "../../../Redux/actions/actionOrders/setOrdersACC";
import { ordersPending } from "../../../Redux/slices/usersSlice";
import Swal from "sweetalert2";
import { Title } from "@tremor/react";
import Loader from "../../Loader/Loader";

export const AllRequest = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState(' ')
  const [detail, setDetail] = useState({
    order: '',
    user: { name: '', email: '' },
    status: '',
    price: 0,
    date: ''
  })
  const [pedido, setPedido] = useState([]);
  const [loading, serLoading] = useState(true)

  useEffect(() => {
    let interval;

    const fetchOrders =  () => {
      try {
        dispatch(ordersAccepted());
        serLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(); // Ejecuta la acción inmediatamente

    interval = setInterval(fetchOrders(), 30000); // 30 segundos en milisegundos

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);


  const AllTickets = useSelector((state) => state.users.usersOrdersPending)

  let AllPending = [];

  if (Array.isArray(AllTickets) && AllTickets.length > 0) { AllPending.push(...AllTickets) }

  useEffect(() => {
    dispatch(ordersPending('Aprobado'))
  }, [])

  const handleDetail = async (e) => {
    const val = e.target.getAttribute('data-value')
    let filtered = AllPending.filter((e) => e.order.includes(val))
    if (filtered) {
      try {

        const response = await axios.get(`${server}/ticket/${val}`);
        let data = response.data;
        if (Array.isArray(data)) {
          let dataForm = [data[1]]
          setPedido(dataForm);
        }
        setDetail(filtered);

      } catch (error) {
        console.log(error);
      };
    };

  };
  const handleChangeType = (e) => {
    const val = e.target.getAttribute('data-value')
    if (val === 'Acepted') {
      setState('Acepted')
      dispatch(ordersPending('Acepted'))
    }
    if (val === 'Aprobado') {
      setState('Aprobado')
      dispatch(ordersPending('Aprobado'))
    }
    if (val === 'Entregado') {
      setState('Entregado')
      dispatch(ordersPending('Entregado'))
    }
    if (val === 'En proceso') {
      setState('En proceso')
      dispatch(ordersPending('En proceso'))
    }
  }
  const handleStatus = async (e) => {
    const val = e.target.getAttribute('data-value')
    try {
      const { data } = await axios.put(`${server}/ticket/${val}`, {
        status: "Completo"
      })
      console.log(data)
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Se completó el pedido",
          confirmButtonText: "OK",
        });
        setDetail({
          order: '',
          user: { name: '', email: '' },
          status: '',
          price: 0,
          date: ''
        })
        setPedido([])
        dispatch(ordersAccepted())
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lo siento ocurrio un error!",
        confirmButtonText: "OK",
      });
      console.log(error)
    }

  }
  const handleStatusEnProceso = async (e) => {
    const val = e.target.getAttribute('data-value')
    try {
      const { data } = await axios.put(`${server}/ticket/${val}`, {
        status: "En proceso"
      })
      console.log(data)
      if (data) {
        Swal.fire({
          icon: "success",
          title: "El pedido esta en proceso",
          confirmButtonText: "OK",
        });
        setDetail({
          order: '',
          user: { name: '', email: '' },
          status: '',
          price: 0,
          date: ''
        })
        setPedido([])
        dispatch(ordersAccepted())
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lo siento ocurrio un error!",
        confirmButtonText: "OK",
      });
      console.log(error)
    }
  }

  const handleStatusEntrega = async (e) => {
    const val = e.target.getAttribute('data-value')
    try {
      const { data } = await axios.put(`${server}/ticket/${val}`, {
        status: "Entregado"
      })
      console.log(data)
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Se entregó el pedido",
          confirmButtonText: "OK",
        });
        setDetail({
          order: '',
          user: { name: '', email: '' },
          status: '',
          price: 0,
          date: ''
        })
        setPedido([])
        dispatch(ordersAccepted())
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lo siento ocurrio un error!",
        confirmButtonText: "OK",
      });
      console.log(error)
    }
  }


  if (loading) return (
    <div style={{ width: '100%', zIndex: '50', top: '0', left: '0', position: 'absolute', height: '100vh', backgroundColor: 'var(--background-darkblue)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <p><Loader /></p>
    </div>)

  return (
    <div className={style.contAll}>
      <div className={style.contReq}>
        <Title>Lista de Pedidos</Title>
        <div className={style.tabsContainer}>
          <button
            className={state === "Aprobado" ? style.activeTab : style.tab}
            onClick={handleChangeType}
            data-value='Aprobado'
          >
            Aprobados
          </button>
          <button
            className={state === "En proceso" ? style.activeTab : style.tab}
            onClick={handleChangeType}
            data-value='En proceso'
          >
            En proceso
          </button>
          <button
            className={state === "Acepted" ? style.activeTab : style.tab}
            onClick={handleChangeType}
            data-value='Acepted'
          >
            Completados
          </button>
          <button
            className={state === "Entregado" ? style.activeTab : style.tab}
            onClick={handleChangeType}
            data-value='Entregado'
          >
            Entregados
          </button>
        </div>

        <Requests state={state} AllPending={AllPending} handleDetail={handleDetail} />
      </div>
      <div>
        <DetailReserv handleStatusEnProceso={handleStatusEnProceso} handleStatusEntrega={handleStatusEntrega} handleStatus={handleStatus} pedido={pedido} detail={detail} />

      </div>

    </div>
  )
}