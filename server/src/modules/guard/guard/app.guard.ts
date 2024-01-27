import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AppGuard extends AuthGuard('jwt') {
 
  constructor(
    private reflector: Reflector,
    ) {
      super();
    }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    try {
        await super.canActivate(context);
      } catch(e) {
        console.log("User is not authorized");

        if(!roles) {
          return true;
        }
        return false;
      }

      if(!roles) {
        return true;
      }

    // validate role access
    return this.matchRoles(roles, req?.user?.roles || "");
  }

  private matchRoles(routeRoles: Array<string>, userRoles: Array<string>): boolean {
    let isAuthorized = false;
  
    userRoles.forEach(role => {
      if (routeRoles.includes(role))  {
        isAuthorized = true;
        return;
      }
    });

    return isAuthorized;
  }
}