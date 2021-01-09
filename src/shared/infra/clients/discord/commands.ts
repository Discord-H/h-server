import { ICommands } from '@shared/core/Command';

import { ServerDashboard } from '@modules/misc/useCases/serverDashboard/ServerDashboardController';
import { WarnUserController } from '@modules/users/useCases/warnUser/WarnUserController';

export const cmds: ICommands = [WarnUserController, ServerDashboard];
