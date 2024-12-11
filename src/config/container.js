const { asClass, createContainer, asValue } = require('awilix');

//Modelos
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Venta = require('../models/venta');

//Repositorios
const UsuarioRepository = require('../repositories/usuarioRepository');
const ProductoRepository = require('../repositories/productoRepository');
const VentaRepository = require('../repositories/ventaRepository');

//Servicios
const UsuarioService = require('../services/usuarioService');
const ProductoService = require('../services/productoService');
const VentaService = require('../services/ventaService');
const UtilidadService = require('../services/utilidadService');
const AuthService = require('../services/authService');

const configureContainer = () => {
    const container = createContainer();

    container.register({
        //Modelos
        Usuario: asValue(Usuario),
        Producto: asValue(Producto),
        Venta: asValue(Venta),

        //Repositorios
        usuarioRepository: asClass(UsuarioRepository).scoped(),
        productoRepository: asClass(ProductoRepository).scoped(),
        ventaRepository: asClass(VentaRepository).scoped(),

        //Servicios
        usuarioService: asClass(UsuarioService).scoped(),
        productoService: asClass(ProductoService).scoped(),
        ventaService: asClass(VentaService).scoped(),
        utilidadService: asClass(UtilidadService).scoped(),
        authService: asClass(AuthService).scoped(),
    });

    return container;
};

module.exports = configureContainer;
