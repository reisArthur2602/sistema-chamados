import { Role } from '@/generated/enums';

export const canPermission = (role: Role, allowed: Role[]) => allowed.includes(role);
