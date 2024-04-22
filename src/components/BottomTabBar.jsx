import React from 'react';
import { NavLink } from 'react-router-dom';
import { USER_INFOS } from '../constants/appConstant';

const BottomTabNav = () => {
    const id = JSON.parse(localStorage.getItem(USER_INFOS)).userId
    const tabs = [
        { name: 'Home', href: '/', icon: 'homeIcon' },
        { name: 'Projets', href: '/project', icon: 'projectsIcon' },
        { name: 'Post', href: '/post', icon: 'postIcon' },
        { name: 'Profil', href: `/account/${id}`, icon: 'profileIcon' },
    ];

    return (
        <div className="fixed inset-x-0 bottom-0 z-10 flex justify-center py-2">
            <div className="flex justify-between items-center space-x-12 bg-white py-2 px-4 rounded-full shadow-lg">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.name}
                        to={tab.href}
                        className={({ isActive }) =>
                            `flex flex-col items-center text-xs text-gray-600 ${isActive ? 'text-red-500' : ''}`
                        }
                    >
                        <i className={`${tab.icon} mb-1`}></i>
                        {tab.name}
                    </NavLink>
                ))}

            </div>
        </div>
    );
};

export default BottomTabNav;
