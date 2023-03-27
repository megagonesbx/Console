export interface MenuItem {
    id: string;
    title: string;
    type: 'collapsable';
    icon: string;
    children: Array<{
        id: string;
        title: string;
        type: 'basic';
        link: string;
    }>;
}