import React from 'react';
import { NavLink } from 'react-router-dom';
import { USER_INFOS } from '../constants/appConstant';
import { FaEnvelope, FaHome, FaProjectDiagram, FaUser } from 'react-icons/fa';

const BottomTabNav = () => {
    const id = JSON.parse(localStorage.getItem(USER_INFOS)).userId;
    const tabs = [
        { name: 'Home', href: '/', icon: <FaHome style={{ width: '20px', height: '20px' }} /> },
        { name: 'Projets', href: '/project', icon: <FaProjectDiagram style={{ width: '20px', height: '20px' }} /> },
        { name: 'Post', href: '/post', icon: <FaEnvelope style={{ width: '20px', height: '20px' }} /> },
        { name: 'Profil', href: `/account/${id}`, icon: <FaUser style={{ width: '20px', height: '20px' }} /> },
    ];

    const Dot = () => (
        <p>&#8226;</p>
    )

    return (
        <div className="fixed inset-x-0 bottom-0 z-10 flex justify-center py-5">
            <div className="flex justify-between items-center space-x-12 bg-orange pt-2 px-7 rounded-xl shadow-lg">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.name}
                        to={tab.href}
                        className="flex flex-col items-center text-sm text-white "

                    >
                        {tab.icon}
                        {tab.name}
                        {/* Dot appear only on active tab  */}
                        {tab.href === window.location.pathname ? <Dot /> : ''}


                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default BottomTabNav;