const express = require('express');
const RolPermisoController = require('../controllers/roles_permisos.controller');

const router = express.Router();
const RolPermisoController = new RolPermisoController();

router.get('/', (req, res) => RolPermisoController.obtenerRolPermisos(req, res));
router.get('/rol/:idrol', (req, res) => RolPermisoController.obtenerPermisosDeRol(req, res));
router.get('/:id', (req, res) => RolPermisoController.obtenerRolPermisoPorId(req, res));
router.post('/', (req, res) => RolPermisoController.agregarRolPermiso(req, res));
router.put('/:id', (req, res) => RolPermisoController.actualizarRolPermiso(req, res));
router.delete('/:id', (req, res) => RolPermisoController.eliminarRolPermiso(req, res));

module.exports = router;