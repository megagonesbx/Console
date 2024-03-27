import { FuseNavigationItem } from "@fuse/components/navigation";
import { User } from "app/core/user/user.types";

export interface ILogin {
    'x-token': string;
    statusCode: number;
    menu: FuseNavigationItem[];
    user: User;
};