import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const result = (await super.canActivate(context)) as boolean;
            return result;
        } catch (error) {
            throw new UnauthorizedException('User session is timed out');
        }
    }
}
