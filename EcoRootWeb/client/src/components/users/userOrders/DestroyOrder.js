import React, { useState } from 'react';

const DestroyOrder = ({ orderId }) => {

    const handleDeleteOrder = async () => {
        try {

            const response = await fetch(`http://localhost:3000/api/user/order/delete/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            // Verifica el estado de la respuesta y actualiza el estado en consecuencia
            if (response.ok) {
                console.log('Orden eliminada exitosamente');
                window.location.reload();
            } else {
                console.log(`Error al eliminar la orden: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al eliminar la orden:', error);
            console.log('Error al intentar eliminar la orden');
        }
    };

    return (
        <div>
            <span onClick={handleDeleteOrder}><i class="fa-regular fa-trash-can"></i></span>
        </div>
    );
};

export default DestroyOrder;
