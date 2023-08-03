import React, { useState } from "react";
import style from './metrics.module.css'
import {OrderMetrics} from './CardsMetrics/ordersMetrics'
import { Tab ,TabList, TabGroup, Flex, } from '@tremor/react'


export const Dates = () => {
 const [StateList, setStateList] = useState('User')
 console.log(StateList)


//  const handleSelect = (e) =>{
//    const val = e.target.getAttribute('data-value')
//    console.log(val)
//    if(val === 'User'){
//        setStateList('User')
//    } 
//    if(val === 'Gains'){
//        setStateList('Gains')
//      }
//  }


    return (
    <div className={style.containerAll}>
      <TabGroup className="mt-9 ml-1" >
        <TabList>
          <div data-value='Gains' >
          <Tab>
          <span data-value='Gains'>Platos Mas Populares</span>
          </Tab>
          </div>
        </TabList>
        <div>
          <Flex>
            <OrderMetrics />
          </Flex>
        </div>
      </TabGroup>
    </div>
  );
};