import React from 'react'
import ShowCardslide from '../components/ShowCardslide'
import AskandQuest from '../components/AskandQuest'
import RestaurantPage from '../components/RestaurantPage'
import FilterBar from '../components/FilterBar'



export const Restaurante = () => {
    return (
        <div>
            <FilterBar />

            <RestaurantPage />

        </div>
    )
}