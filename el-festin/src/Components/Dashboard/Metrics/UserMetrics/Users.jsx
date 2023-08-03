import React, { useState } from "react";
import {UsersMetrics} from './UsersMetrics'
import style from '../metrics.module.css'
import { Tab ,TabList, TabGroup, Flex, } from '@tremor/react'

export const UsersData = () =>{
   
    return(
        <div className={style.contUserM}>
            <TabGroup className="mt-9" >
                <TabList>
                    <Tab>Usuarios Registrados</Tab>
                </TabList>
                <div>
                    <UsersMetrics/>
                </div>
            </TabGroup>
        </div>
    )
}
