import React, { ReactNode } from 'react';
export interface TabsProps {
    className?: string;
    style?: React.CSSProperties;
    prefix?: string;
    defaultActiveKey?: string;
    centered?: boolean;
    onChange?: (key: string) => void;
    onTabClick?: (key: string, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
    tabs: {
        label: ReactNode;
        key: string;
        content: ReactNode;
        disabled?: boolean;
    }[];
}
declare function Tabs(props: TabsProps): JSX.Element | null;
export { Tabs };
