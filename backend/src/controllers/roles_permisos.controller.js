const db = require('../config/conexion_db');

class RolPermisoController {
  // Obtener todas las relaciones rol-permiso
  async obtenerRolPermisos(req, res) {
    try{
      const [rolPermisos] = await db.query(`
        SELECT rp.id_rol_permiso, rp.id_rol, r.nombre AS rol, p.nombre AS permiso
        FROM rol_permiso rp
        JOIN roles r ON rp.id_rol = r.id_rol
        JOIN permisos p ON rp.permiso_id = p.id_permiso
      `);
      res.json(rolPermisos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener roles-permisos' });
    }
  }

  async obtenerPermisosDeRol(req, res) {
    const { idrol } = req.params;
    try {
      const [rolPermisos] = await db.query(`
        SELECT
          rp.id_rol_permiso,
          rp.id_rol,
          r.nombre AS rol,
          p.id_permiso,
          p.nombre AS permiso
        FROM rol_permiso rp
        JOIN roles r ON rp.id_rol = r.id_rol
        JOIN permisos p ON rp.permiso_id = p.id_permiso
        WHERE rp.id_rol = ?
      `, [idrol]); // parametro
      res.json(rolPermisos);
    } catch (error) {
      console.error("Error en obtenerPermisosDeRol:", error);
      res.status(500).json({ error: 'Error al obtener roles-permisos' });
    }
  }

  // Obtener una relacion por ID
  async obtenerRolPermisoPorId(req, res) {
    const { id } = req.params;
    try {
      const [rolPermiso] = await db.query(`
        SELECT rp.id_rol_permiso, r.nombre AS rol, p.nombre AS permiso
        FROM rol_permiso rp
        JOIN roles r ON rp.id_rol = r.id_rol
        JOIN permisos p ON rp.permiso_id = p.id_permiso
        WHERE rp.id_rol_permiso = ?
      `, [id]);

      if (rolPermiso.length === 0) {
        return res.status(404).json({ error: 'Relacion rol-permiso no encontrada' });
      }

      res.json(rolPermiso[0]);
      
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener relacion rol-permiso' });
    }
  }

  // Asignar un permiso a un rol
  async agregarRolPermiso(req, res) {
    const { id_rol, permiso_id } = req.body;
    try {
      await db.query(
        `INSERT INTO rol_permiso (id_rol, permiso_id) VALUES (?, ?)`,
        [id_rol, permiso_id]
      );
      res.json({ mensaje: 'Permiso asignado al rol correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al asignar permiso al rol' });
    }
  }

  // Actualizar una relacion (cambiar el permiso o el rol asociado)
  async actualizarRolPermiso(req, res) {
    const { id } = req.params;
    const { id_rol, permiso_id } = req.body;
    try{
      await db.query(
        'UPDATE rol_permiso SET id_rol = ?, permiso_id = ? WHERE id_rol_permiso = ?',
        [id_rol, permiso_id, id]
      );
      res.json({ mensaje: 'Relacion rol-permiso actualizada correctamente' })
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar relacion rol-permiso' });
    }
  }

  // Eliminar una relacion rol-permiso
  async eliminarRolPermiso(req, res) {
    const { id } = req.params;
    try{
      await db.query('DELETE FROM rol_permiso WHERE id_rol_permiso = ?', [id]);
      res.json({ mensaje: 'Relacion rol-permiso eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar relacion rol-permiso' })
    }
  }
}

module.exports = RolPermisoController;

