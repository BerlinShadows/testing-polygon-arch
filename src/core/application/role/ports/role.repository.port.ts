import { Role } from '../../../domain/role/role.entity';

export abstract class RoleRepositoryPort {
  abstract create(role: Role): Promise<Role>;
  abstract findById(id: string): Promise<Role | null>;
  abstract findByName(name: string): Promise<Role | null>;
  abstract findAll(): Promise<Role[]>;
  abstract update(role: Role): Promise<Role>;
  abstract delete(id: string): Promise<void>;
}
