import { Injectable } from '@nestjs/common';

import { PgDatabaseService } from '../database/pg-database.service';
import { UserRepositoryPort } from 'src/core/application/user/ports/user.repository.port';
import { User } from 'src/core/domain/user/user.entity';
import { PaginatedResult, PaginationOptions } from 'src/shared/types/pagination.types';
import { UserFilters } from 'src/core/domain/user/user.filters';

@Injectable()
export class PgUserRepository implements UserRepositoryPort {
    constructor(private pg: PgDatabaseService) { }

    async findAll(options: PaginationOptions, filters: UserFilters = {}): Promise<PaginatedResult<User>> {
        const { page, limit } = options;
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM users WHERE 1=1';
        let params: any[] = [];

        if (filters.email) {
            query += ' AND email ILIKE $' + (params.length + 1);
            params.push(`%${filters.email}%`);
        }

        if (filters.isActive !== undefined) {
            query += ' AND is_active = $' + (params.length + 1);
            params.push(filters.isActive);
        }

        query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
        params.push(limit, offset);

        let countQuery = 'SELECT COUNT(*) FROM users WHERE 1=1';
        let countParams: any[] = [];

        if (filters.email) {
            countQuery += ' AND email ILIKE $' + (countParams.length + 1);
            countParams.push(`%${filters.email}%`);
        }

        if (filters.isActive !== undefined) {
            countQuery += ' AND is_active = $' + (countParams.length + 1);
            countParams.push(filters.isActive);
        }

        const countResult = await this.pg.getPool().query(countQuery, countParams);
        const total = parseInt(countResult.rows[0].count, 10);

        const result = await this.pg.getPool().query(query, params);

        return {
            data: result.rows.map(row => this.mapRowToUser(row)),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
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
