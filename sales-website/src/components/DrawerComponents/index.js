import { Drawer } from 'antd';

function DrawerComponents({
    title = 'Basic DrawerComponents',
    placement = 'right',
    isOpen = false,
    children,
    ...rests
}) {
    return (
        <>
            <Drawer title="Basic Drawer" placement={placement} Open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>
    );
}

export default DrawerComponents;
