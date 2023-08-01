import React, { useState } from "react";
import {UsersMetrics} from './CardsMetrics/UsersMetrics'
import style from './metrics.module.css'
import {OrderMetrics} from './CardsMetrics/ordersMetrics'
import { Tab ,TabList, TabGroup, Flex, } from '@tremor/react'


export const Dates = () => {
 const [StateList, setStateList] = useState('User')
 console.log(StateList)


 const handleSelect = (e) =>{
   const val = e.target.getAttribute('data-value')
   console.log(val)
   if(val === 'User'){
       setStateList('User')
   } 
   if(val === 'Gains'){
       setStateList('Gains')
     }
 }


    return (
    <div className={style.containerAll}>
      <TabGroup className="mt-9">
        <TabList>
          <div onClick={handleSelect} data-value='User' >
          <Tab>
            <span onClick={handleSelect} data-value='User'>Usuarios Registrados</span>
          </Tab>
          </div>
          <div onClick={handleSelect} data-value='Gains' >
          <Tab>
          <span  onClick={handleSelect} data-value='Gains'>Ultimas Ganancias</span>
          </Tab>
          </div>
        </TabList>
        <div className={style.containerM}>
          <Flex>
            {/* Aquí se usa la condición para mostrar los componentes */}
            {StateList === 'User' ? <UsersMetrics /> : <OrderMetrics />}
          </Flex>
        </div>
      </TabGroup>
    </div>
  );
};