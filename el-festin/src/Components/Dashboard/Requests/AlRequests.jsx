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
  const [state, setState] = useState('Acepted')
  const [detail, setDetail] = useState({
    order: '',
    user: { name: '', email: '' },
    status: '',
    price: 0,
    date: ''
  })

  const [pedido, setPedido] = useState([]);

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    dispatch(ordersAccepted())
  }, [])

  const AllPending = useSelector((state) => state.users.usersOrdersPending);

  const handleDetail = async (e) => {
    const val = e.target.getAttribute('data-value')
    let filtered = Array.isArray(AllPending) && AllPending.filter((e) => e.order.includes(val))

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
    if (val === 'Pending') {
      setState('Pending')
      dispatch(ordersPending('Pending'))
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
            className={state === "Acepted" ? style.activeTab : style.tab}
            onClick={handleChangeType}
            data-value='Acepted'
          >
            Aprobados
          </button>
          <button
            className={state === "Pending" ? style.activeTab : style.tab}
            onClick={handleChangeType}
            data-value='Pending'
          >
            En proceso
          </button>
        </div>
        <Requests state={state} AllPending={AllPending} handleDetail={handleDetail} />
      </div>
      <div>
        <DetailReserv handleStatus={handleStatus} pedido={pedido} detail={detail} />

      </div>
    </div>
  )
}