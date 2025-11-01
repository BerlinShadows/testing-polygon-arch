import { Injectable } from '@nestjs/common';

import { RoleRepositoryPort } from 'src/core/application/role/ports/role.repository.port';
import { Role } from 'src/core/domain/role/role.entity';
import { PgDatabaseService } from '../database/pg-database.service';


@Injectable()
export class PgRoleRepository implements RoleRepositoryPort {
    constructor(private pg: PgDatabaseService) { }

    async create(role: Role): Promise<Role> {
        const query = `
      INSERT INTO roles (id, name, description, created_at)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
        const values = [
            role.id,
            role.name,
            role.description,
            role.createdAt,
        ];

        const result = await this.pg.getPool().query(query, values);
        return this.mapRowToRole(result.rows[0]);
    }

    async findById(id: string): Promise<Role | null> {
        const result = await this.pg.getPool().query('SELECT * FROM roles WHERE id = $1', [id]);
        return result.rows.length ? this.mapRowToRole(result.rows[0]) : null;
    }

    async findByName(name: string): Promise<Role | null> {
        const result = await this.pg.getPool().query('SELECT * FROM roles WHERE name = $1', [name]);
        return result.rows.length ? this.mapRowToRole(result.rows[0]) : null;
    }

    async findAll(): Promise<Role[]> {
        const result = await this.pg.getPool().query('SELECT * FROM roles ORDER BY created_at DESC');
        return result.rows.map(row => this.mapRowToRole(row));
    }

    async update(role: Role): Promise<Role> {
        const query = `
      UPDATE roles
      SET name = $1, description = $2, created_at = $3
      WHERE id = $4
      RETURNING *;
    `;
        const values = [role.name, role.description, role.createdAt, role.id];
        const result = await this.pg.getPool().query(query, values);
        return this.mapRowToRole(result.rows[0]);
    }

    async delete(id: string): Promise<void> {
        await this.pg.getPool().query('DELETE FROM roles WHERE id = $1', [id]);
    }

    private mapRowToRole(row: any): Role {
        return new Role(
            row.id,
            row.name,
            row.description,
            new Date(row.created_at),
        );
    }
}