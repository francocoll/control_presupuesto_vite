import { useState, useEffect } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    gastoEditar,
    guardarGasto,
    setGastoEditar }) => {
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(() => {
         if(Object.keys(gastoEditar).length > 0){
             setNombre(gastoEditar.nombre)
             setCantidad(gastoEditar.cantidad)
             setCategoria(gastoEditar.categoria)
             setId(gastoEditar.id)
             setFecha(gastoEditar.fecha)
         }
    },[])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500)
    }
    const handleSubmit = e => {
        e.preventDefault()
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return;
        }
        guardarGasto({ nombre, cantidad, categoria, id, fecha })
    }
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt='cerrar'
                    onClick={ocultarModal}
                />
            </div>
            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre gasto: </label>
                    <input
                        id='nombre'
                        type='text'
                        placeholder='A??ade el nombre'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad: </label>
                    <input
                        id='cantidad'
                        type='number'
                        placeholder='A??ade la cantidad a gastar, ej: 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoria: </label>
                    <select
                        id='categoria'
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value=''>--Seleccione--</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='comida'>Comida</option>
                        <option value='casa'>Casa</option>
                        <option value='gastos'>Gastos</option>
                        <option value='ccio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='subscripciones'>Subscripciones</option>
                    </select>
                </div>
                <input
                    type='submit'
                    value={gastoEditar.nombre ? 'Guardar cambios' : 'A??adir gasto'}
                />
            </form>
        </div>
    )
}

export default Modal