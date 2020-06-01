import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'home',
        title: 'Accueil',
        translate: 'NAV.HOME.TITLE',
        type: 'group',
        children: [
            {
                id: 'welcome',
                title: 'Accueil',
                translate: 'NAV.HOME.TITLE',
                type: 'item',
                icon: 'home',
                url: '/home'
            }
        ]
    },
    // {
    //     id: 'upload',
    //     title: 'Upload Example',
    //     translate: 'Upload Example',
    //     type: 'item',
    //     icon: 'file',
    //     url: '/uploadExample'
    // }, 
    // {
    //     id: 'Stepper',
    //     title: 'Stepper Example',
    //     translate: 'Stepper Example',
    //     type: 'item',
    //     icon: 'file',
    //     url: '/stepper-example'
    // },   
    {
        id: 'business',
        title: 'Matier',
        translate: 'NAV.BUSINESS.TITLE',
        type: 'group',
        children: [
            {
                id: 'patrimony',
                title: 'patrimoine',
                translate: 'NAV.PATRIMONY.TITLE',
                type: 'collapsable',
                icon: 'web_asset',
                children:[
                    {
                        id   : 'list',
                        title: 'Liste',
                        translate: 'NAV.PATRIMONY.ITEMS.LIST',
                        type : 'item',
                        url  : 'patrimony/ouvrages/list'
                    },
                    {
                        id   : 'integrate',
                        title: 'Intégrer',
                        translate: 'NAV.PATRIMONY.ITEMS.INTEGRATE',
                        type : 'item',
                        url  : 'patrimony/ouvrages/add'
                    },
                    {
                        id: 'chain',
                        title: 'Chaine',
                        translate: 'NAV.PATRIMONY.ITEMS.CHAIN',
                        type: 'item',
                        url: 'patrimony/chain/list'
                    }
                ]
                
            },
            {
                id: 'inventory',
                title: 'inventaire',
                translate: 'NAV.INVENTORY.TITLE',
                type: 'collapsable',
                icon: 'list_alt',
                children:[
                    {
                        id: 'lancer',
                        title: 'Lancer inventaire',
                        translate: 'NAV.INVENTORY.ITEMS.START',
                        type: 'item',
                        url: 'patrimony/inventory/add'
                    },
                    {
                        id   : 'suivre',
                        title: 'Suivre inventaire',
                        translate: 'NAV.INVENTORY.ITEMS.FOLLOW',
                        type : 'item',
                        url  : 'pasencore'
                    },
                    {
                        id: 'liste',
                        title: 'Liste inventaires',
                        translate: 'NAV.INVENTORY.ITEMS.LIST',
                        type: 'item',
                        url: 'pasencore'
                    }
                ]

            },
            {
                id: 'exploitation',
                title: 'exploitation',
                translate: 'NAV.EXPLOITATION.TITLE',
                type: 'collapsable',
                icon: 'build',
                children:[
                    {
                        id: 'lancer',
                        title: 'Lancer inventaire',
                        translate: 'NAV.EXPLOITATION.ITEMS.START',
                        type: 'item',
                        url: 'pasencores'
                    },
                    {
                        id   : 'suivre',
                        title: 'Suivre inventaire',
                        translate: 'NAV.EXPLOITATION.ITEMS.FOLLOW',
                        type : 'item',
                        url  : 'pasencore'
                    },
                    {
                        id: 'liste',
                        title: 'Liste inventaires',
                        translate: 'NAV.EXPLOITATION.ITEMS.LIST',
                        type: 'item',
                        url: 'pasencore'
                    }
                ]

            }
        ]
    },
    {
        id: 'admin',
        title: 'Admin',
        translate: 'NAV.ADMIN.TITLE',
        type: 'group',
        authorizations: ['users', 'profils', 'unit', 'centers', 'agencies', 'cachboxes'],
        children: [
            {
                id: 'users',
                title: 'utilisateurs',
                translate: 'NAV.USERS.TITLE',
                type: 'item',
                icon: 'supervised_user_circle',
                url: '/admin/users',
                authorizations: ['users']
            },
            {
                id: 'profiles',
                title: 'Profils',
                translate: 'NAV.PROFILES.TITLE',
                type: 'item',
                icon: 'account_balance',
                url: '/admin/profils',
                authorizations: ['profils']
            },
            {
                id: 'unit',
                title: 'Unit',
                translate: 'NAV.UNIT.TITLE',
                type: 'item',
                icon: 'border_all',
                url: '/admin/unit',
                authorizations: ['unit']
            },
            {
                id: 'centers',
                title: 'Centres',
                translate: 'NAV.CENTERS.TITLE',
                type: 'item',
                icon: 'location_city',
                url: '/admin/centers',
                authorizations: ['centers']
            }
        ]
    }
];