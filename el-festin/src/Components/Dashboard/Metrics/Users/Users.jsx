import React, { useState } from "react";
import {UsersMetrics} from './UsersMetrics'
import style from '../metrics.module.css'
import { Tab ,TabList, TabGroup, Flex, } from '@tremor/react'

export const UsersData = () =>{
   
    return(
        <div className={style.containerAll}>
            <TabGroup className="mt-9 ml-1">
                <TabList>
                    <div>
                    <Tab className={style.contTitle}>
                    <span> Usuarios Registrados </span>
                    </Tab>
                    </div>
                </TabList>
             <div>
          <UsersMetrics/>
          </div>
            </TabGroup>
        </div>
    )
}