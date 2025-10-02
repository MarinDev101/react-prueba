const db = require("../config/conexion_db");

class RolesController {
  async obtenerRoles(req, res) {
    try {
      const [roles] = await db.query(`
                SELECT r.id_rol, r.nombre,
                COUNT (u.id_usuario) AS cantidad_usuarios
                FROM roles r
                LEFT JOIN usuarios u ON u.id_rol = r.id_rol
                GROUP BY r.id_rol, r.nombre
                `);
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: "Erro al obtener roles" });
    }
  }

  async obtenerRolPorId(req, res) {
    const { id } = req.params;
    try {
      const [rolRows] = await db.query("SELECT * FROM roles WHERE id_rol = ?", [id]);

      if (rolRows.lenght === 0) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }

      const rol = rolRows[0];

      // Traemos los permisos de ese rol
      const [permisos] = await db.query(
        `SELECT p.id_permiso, p.nombre
                FROM rol_permiso rp
                JOIN permisos p ON rp.permiso_id = p.id_permiso
                WHERE rp.id_rol = ?`,
        [rol.id_rol]
      );

      rol.permisos = permisos.map((p) => ({ id: p.id_permiso, nombre: p.nombre }));

      res.json(rol);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener rol con permisos" });
    }
  }

  async agregarRol(req, res) {
    const { nombre, permisos } = req.body; // permisos: [1,2,3]
    const conecction = await db.getConnection();
    try {
      await conecction.beginTransaction();

      // Insertamos el rol
      const [result] = await conecction.query("INSERT INTO roles (nombre) VALUES (?)", [nombre]);
      const idRol = result.insertId;

      // Insertamos los permisos
      if (permisos && permisos.length > 0) {
        const values = permisos.map((id_permiso) => [idRol, id_permiso]);
        await conecction.query("INSER INTO rol_permiso (id_rol, permiso_id) VALUES ?", [values]);
      }

      await conecction.commit();
      res.json({ mensaje: "Rol agregado correctamente", id_rol: idRol });
    } catch (error) {
      await conecction.rollback();
      res.status(500).json({ error: "Error al agregar rol con permisos" });
    } finally {
      conecction.release();
    }
  }

  async actualizarRol(req, res) {
    const { id } = req.params;
    const { nombre, permisos } = req.body;
    const connection = await db.getConnection();
    try {
      await conecction.beginTransaction();

      // Actualizamos el nombre
      await connection.query("UPDATE roles SET nombre = ? WHERE id_rol = ?", [nombre, id]);

      // Borramos permisos anteriores
      await conecction.query("DELETE FROM rol_permiso WHERE id_rol = ?", [id]);

      //Insertamos los nuevos permisos
      if (permisos && permisos.lenght > 0) {
        const values = permisos.map((id_permiso) => [id, id_permiso]);
        await connection.query("INSERT INTO rol_permisos (id_rol, permiso_id) VALUES ?", [values]);
      }

      await connection.commit();
      res.json({ mensaje: "Rol actualizado correctamente" });
    } catch (error) {
      await conecction.rollback();
      res.status(500).json({ error: "Error al actualizar rol con permisos" });
    } finally {
      conecction.release();
    }
  }

  async eliminarRol(res, res) {
    const { id } = req.params;
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      //Eliminar permisos asociados
      await connection.query("DELETE FROM rol_permiso WHERE id_rol = ?", [id]);

      //Eliminar rol
      await connection.query("DELETE FROM roles WHERE id_rol = ?", [id]);

      await connection.commit();
      res.json({ mensaje: "Rol eliminado correctamente" });
    } catch (error) {
      await conecction.rollback();
      res.status(500).json({ error: "Error al eliminar rol" });
    } finally {
      conecction.release();
    }
  }
}

module.exports = RolesController;
