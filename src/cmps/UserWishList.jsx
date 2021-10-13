import React from 'react'
import { Link } from 'react-router-dom'
import { WishListPreview } from './WishListPreview';

export function UserWishList({ userSavedStays, onRemoveSavedStay }) {

    return (
        <div className="wish-list">
           
            {userSavedStays.map((stayId=>   <WishListPreview key={stayId} stayId={stayId} onRemoveSavedStay={onRemoveSavedStay} />))}
           
         </div> 

    )
}