import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import './EliminarAlerta.css'; 

export const EliminarAlerta = ({ onConfirmar, onCancelar }) => {
  useEffect(() => {
    const showConfirmationAlert = () => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success btn-alert',
          cancelButton: 'btn btn-danger btn-alert'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: 'Estás seguro?',
        text: "¡Se eliminará de forma permanente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          onConfirmar();
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se ha eliminado correctamente.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          onCancelar();
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'EL proceso ha sido cancelado.',
            'error'
          );
        }
      });
    };

    showConfirmationAlert();
  }, [onConfirmar, onCancelar]);

  return null; // No se renderiza ningún elemento en el componente
};
