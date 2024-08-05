const { Router } = require('express');



const {CrearUsuario} = require('../controllers/Usuario/Post/Crear_Usuario')
const {BusquedaUsuario} = require('../controllers/Usuario/Get/Buscar_Usuario')
const {ModificarUsuario} = require('../controllers/Usuario/Put/Modificar_Usuario')

const router = Router();
router.post('/usuario/create', CrearUsuario)
router.get('/usuario/login/:user/:pass', BusquedaUsuario)
router.put('/usuario/update/:id',ModificarUsuario)
/*
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//!MEtodos Empresa 

router.get('/empresa/:correo/:pass', DataTiendaUsuario);
router.get('/empresa/color/',obtenerColores)
router.get('/empresa/tallas/',obtenerTallas)
router.get('/empresa/marcas',obtenerMarcas)
router.get('/empresa/calidad',obtenerCalidad)
router.get('/empresa/:id', obtenerTienda)
router.post('/empresa/categorias',obtenerCategorias)
router.get('/empresa/buscar/stock/:id', ObtenerCardsEmpresa)
router.get('/empresa/orders/all/:id', ObtenerOrdersEmpresa)
router.put('/empresa/actualizar/zapato/:id', ActualizaCardsEmpresa)
router.delete('/empresa/eliminar/zapato/:id', EliminarZapatoEmrpesa)


router.put('/empresa/update/:id', ActualizarEmpresa)
router.put('/empresa/buscar/stock/stado/:id', Activar_Ocultar_Card)


router.post('/empresa/imagen', CrearImagen )
router.post('/empresa/create/stock', CrearStock)


//!MEtodos Usuario 

router.post('/user/create', CrearUsuario)
router.post('/user/venta', CrearCompra) //!sse crea la url de mercado pago
router.post('/user/create/order', CreateOrderVenta)//!Se crea la orden de venta 
router.post('/user/datos/id/', CorreoClaveUsers)
router.get('/user/orders/:id', BuscarOrdersUsers)//!buscar las ordenes del usuario
router.get('/user/:correo/:pass', BusquedaUsuario);
router.get('/user/zapatos', BusquedaZapatosUsuario)
router.put('/user/actualizardatos/:id', ModificarUsuario)//!modificamos datos del usuario 






//! Actividad Mercado PAgo
router.post('/compra', createPaymentHandler)
router.put('/order/actualizar/:id', ActualizaOrder);*/

module.exports = router;
