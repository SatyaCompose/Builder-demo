'use client';
import React, { useEffect, useState } from 'react';
import styles from './MegaMenu.module.css'; // Adjust the path as necessary
import { builder } from '@builder.io/sdk';

export interface SubMenu {
    subMenuUrl: string;
    subMenuTitle: string;
}

export interface MenuItem {
    title: string;
    url: string;
    subMenus?: SubMenu[];
}

export interface MegaMenuProps {
    initialData?: MenuItem[];
}

builder.init('6c476b9f79974e74ace7fa278e8bc666');

const MegaMenu: React.FC<MegaMenuProps> = ({ initialData = [] }) => {
    const [data, setData] = useState<MenuItem[]>(initialData);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Replace with your actual data fetching logic
        builder.get('megamenu').promise().then(({ data }) => {
            setData(data.appliances.data);
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching megamenu data:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.megamenuContainer}>
            <div className={styles.megamenuWeb}>
                {data.map((section, index) => (
                    <div className={`${styles.columnWeb} ${index === data.length - 1 ? styles.lastColumnWeb : ''}`}
                        key={index}
                    >
                        <h3 className={styles.titleWeb}>
                            <a href={section.url}>{section.title}</a>
                        </h3>
                        {section.subMenus && section.subMenus.length > 0 && (
                            <ul>
                                {section.subMenus.map((subMenu, subIndex) => (
                                    <li
                                        key={subIndex}
                                        className={`${subIndex === 0 ? styles.firstItem : ''} ${subIndex === section.subMenus!.length - 1 ? styles.lastItem : ''}`}
                                    >
                                        {subMenu.subMenuTitle === 'View all' ? (
                                            <a href={subMenu.subMenuUrl}>{subMenu.subMenuTitle}</a>
                                        ) : (
                                            <a href={`${section.url}/${subMenu.subMenuUrl}`}>{subMenu.subMenuTitle}</a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MegaMenu;
