import { Injectable } from '@nestjs/common';

import { PgDatabaseService } from '../database/pg-database.service';
import { UserRepositoryPort } from 'src/core/application/user/ports/user.repository.port';
import { User } from 'src/core/domain/user/user.entity';

@Injectable()
export class PgUserRepository implements UserRepositoryPort {
    constructor(private pg: PgDatabaseService) { }

    async findAll(): Promise<User[]> {
        const result = await this.pg.getPool().query('SELECT * FROM users ORDER BY created_at DESC');
        return result.rows.map(row => this.mapRowToUser(row));
    }

    async create(user: User): Promise<User> {
        const query = `
      INSERT INTO users (id, email, name, roles, is_active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
        const values = [
            user.id,
            user.email,
            user.name,
            JSON.stringify(user.roles), // user.roles,
            user.isActive,
            user.createdAt,
            user.updatedAt,
        ];

        const result = await this.pg.getPool().query(query, values);
        return this.mapRowToUser(result.rows[0]);
    }

    async findById(id: string): Promise<User | null> {
        const result = await this.pg
            .getPool()
            .query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows.length ? this.mapRowToUser(result.rows[0]) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.pg
            .getPool()
            .query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows.length ? this.mapRowToUser(result.rows[0]) : null;
    }

    async update(user: User): Promise<User> {
        const query = `
      UPDATE users
      SET email = $1, name = $2, roles = $3, is_active = $4, updated_at = $5
      WHERE id = $6
      RETURNING *;
    `;
        const values = [
            user.email,
            user.name,
            user.roles,
            user.isActive,
            user.updatedAt,
            user.id,
        ];
        const result = await this.pg.getPool().query(query, values);
        return this.mapRowToUser(result.rows[0]);
    }

    async delete(id: string): Promise<void> {
        await this.pg.getPool().query('DELETE FROM users WHERE id = $1', [id]);
    }

    private mapRowToUser(row: any): User {
        return new User(
            row.id,
            row.email,
            row.name,
            typeof row.roles === 'string' ? JSON.parse(row.roles) : row.roles, // row.roles,
            row.is_active,
            new Date(row.created_at),
            new Date(row.updated_at),
        );
    }
}
