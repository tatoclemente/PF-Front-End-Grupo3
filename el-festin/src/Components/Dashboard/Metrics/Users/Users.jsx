import React, { useState } from "react";
import {UsersMetrics} from './UsersMetrics'
import style from '../metrics.module.css'
import { Tab ,TabList, TabGroup, Flex, } from '@tremor/react'

export const UsersData = ({ currentUser }) =>{
   
    return(
        <div className={style.containerAll}>
            <TabGroup className="mt-9 ml-1">
                <TabList>
                <div className={style.tabsContainer} data-value='Gains' >
      
      <span className={style.activeTab}>Usuarios registrados</span>
   
      </div>
                </TabList>
             <div>
          <UsersMetrics currentUser={currentUser}/>
          </div>
            </TabGroup>
        </div>
    )
}
