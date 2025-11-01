import { Injectable } from '@nestjs/common';

import { RoleRepositoryPort } from 'src/core/application/role/ports/role.repository.port';
import { Role } from 'src/core/domain/role/role.entity';

@Injectable()
export class InMemoryRoleRepository implements RoleRepositoryPort {
    private roles: Role[] = [];

    async create(role: Role): Promise<Role> {
        this.roles.push(role);
        return role;
    }

    async findById(id: string): Promise<Role | null> {
        return this.roles.find(r => r.id === id) || null;
    }

    async findByName(name: string): Promise<Role | null> {
        return this.roles.find(r => r.name === name) || null;
    }

    async findAll(): Promise<Role[]> {
        return this.roles;
    }

    async update(role: Role): Promise<Role> {
        const index = this.roles.findIndex(r => r.id === role.id);
        if (index !== -1) {
            this.roles[index] = role;
        }
        return role;
    }

    async delete(id: string): Promise<void> {
        this.roles = this.roles.filter(r => r.id !== id);
    }
}