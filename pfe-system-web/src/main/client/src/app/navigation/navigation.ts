import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'home',
        title: 'Accueil',
        translate: 'NAV.HOME.TITLE',
        type: 'group',
        authorizations: ['*:*'],
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
                authorizations: ['ouvrage:show', 'chain:show', 'ouvrage:declassed'],
                children:[
                    {
                        id   : 'list',
                        title: 'Liste',
                        translate: 'NAV.PATRIMONY.ITEMS.LIST',
                        type : 'item',
                        url  : 'patrimony/ouvrages',
                        authorizations : ['ouvrage:show']
                    },
                    {
                        id: 'chain',
                        title: 'Chaine',
                        translate: 'NAV.PATRIMONY.ITEMS.CHAIN',
                        type: 'item',
                        url: 'patrimony/chain',
                        authorizations : ['chain:show']
                    },
                    {
                        id: 'declassed',
                        title: 'Ouvrage déclassé',
                        translate: 'NAV.PATRIMONY.ITEMS.DEC',
                        type: 'item',
                        url: 'patrimony/ouvrages/declassed',
                        authorizations : ['ouvrage:declassed']
                    }
                ]
                
            },
            {
                id: 'inventory',
                title: 'inventaire',
                translate: 'NAV.INVENTORY.TITLE',
                type: 'collapsable',
                icon: 'list_alt',
                authorizations: ['inventory:show', 'ouvrage:inventory', 'ouvrage:validate', 'inventory:add'],
                children:[
                    {
                        id: 'lancer',
                        title: 'Lancer inventaire',
                        translate: 'NAV.INVENTORY.ITEMS.START',
                        type: 'item',
                        url: 'patrimony/inventory/add',
                        authorizations : ['inventory:add','*:*']
                    },
                    {
                        id   : 'suivre',
                        title: 'Suivre inventaire',
                        translate: 'NAV.INVENTORY.ITEMS.FOLLOW',
                        type : 'item',
                        url  : 'patrimony/inventory/current',
                        authorizations : ['ouvrage:inventory','ouvrage:validate']
                    },
                    {
                        id: 'liste',
                        title: 'Liste inventaires',
                        translate: 'NAV.INVENTORY.ITEMS.LIST',
                        type: 'item',
                        url: 'patrimony/inventory/completed',
                        authorizations : ['inventory:show']
                    }
                ]

            },
            {
                id: 'exploitation',
                title: 'exploitation',
                translate: 'NAV.EXPLOITATION.TITLE',
                type: 'item',
                icon: 'build',
                url: 'exploitation/reading',
                authorizations: ['exploitation:addreleve','exploitaion:personnel'],
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