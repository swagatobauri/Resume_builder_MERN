import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    // Bypassing authentication for now
    return <Outlet />;
}
