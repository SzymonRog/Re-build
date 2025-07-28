'use client'
import React from 'react'
import { useBuildStore } from '@/store/buildStore'

const Page = () => {

    const name = useBuildStore(state => state.name)
    const components = useBuildStore(state => state.components)
    const totalPrice = useBuildStore(state => state.totalPrice)

    return (

            <div>
                <h1>{name}</h1>
                {totalPrice}
                {components.map(component => (
                    <div key={component.id}>
                        <h1>{component.name}, {component.price}</h1>
                    </div>
                ))}
            </div>

    )
}
export default Page
