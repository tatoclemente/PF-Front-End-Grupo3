import React from "react";
import style from './metrics.module.css'
import '../../../tailwind.css'
import {OrderMetrics} from './CardsMetrics/ordersMetrics'
import { TabList, TabGroup, Flex, } from '@tremor/react'


export const Dates = () => {

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
          <div className={style.tabsContainer} data-value='Gains' >
      
          <span className={style.activeTab}>Platos Mas Populares</span>
       
          </div>
        </TabList>
        <div className={style.mostSaleContent}>
          <Flex>
            <OrderMetrics />
          </Flex>
        </div>
      </TabGroup>
    </div>
  );
};