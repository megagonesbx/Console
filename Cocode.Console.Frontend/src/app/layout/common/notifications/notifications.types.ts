export interface Notification {
    id: string;
    icon?: string;
    image?: string;
    title?: string;
    description?: string;
    time?: string;
    link?: string;
    useRouter?: boolean;
    read?: boolean;
    viewed?: boolean;
    delete?: boolean;
    message?: string;
}

export interface IGetNotifications {
    notifications: INotification[];
    statusCode: number;
}

export interface INotification {
    message: string;
    viewed: boolean;
    createdAt: string;
    id: number;
}