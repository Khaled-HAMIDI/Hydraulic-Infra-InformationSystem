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
                icon: 'home',
                children:[
                    {
                        id   : 'list',
                        title: 'Liste',
                        translate: 'NAV.PATRIMONY.ITEMS.LIST',
                        type : 'item',
                        url  : 'patrimony/ouvrages'
                    },
                    {
                        id   : 'integrate',
                        title: 'Intégrer',
                        translate: 'NAV.PATRIMONY.ITEMS.INTEGRATE',
                        type : 'item',
                        url  : 'patrimony/ouvrages/add'
                    }
                ]
                
            },
            {
                id: 'inventory',
                title: 'inventaire',
                translate: 'NAV.INVENTORY.TITLE',
                type: 'collapsable',
                icon: 'home',
                children:[
                    {
<<<<<<< HEAD
                        id   : 'lancer',
                        title: 'Lancer inventaire',
                        translate: 'NAV.INVENTORY.ITEMS.START',
                        type : 'item',
                        url  : 'pasencore'
||||||| merged common ancestors
                        'id'   : 'list',
                        'title': 'Liste',
                        'type' : 'item',
                        'url'  : 'patrimony/ouvrages'
=======
                        'id'   : 'list',
                        'title': 'Liste',
                        'type' : 'item',
                        'url'  : 'patrimony/ouvrages/list'
>>>>>>> 32871ae2a2f7ada4ebc4341c770ef881a2e60564
                    },
                    {
                        id   : 'suivre',
                        title: 'Suivre inventaire',
                        translate: 'NAV.INVENTORY.ITEMS.FOLLOW',
                        type : 'item',
                        url  : 'pasencore'
                    },
                    {
<<<<<<< HEAD
                        id   : 'liste',
                        title: 'Liste inventaires',
                        translate: 'NAV.INVENTORY.ITEMS.LIST',
                        type : 'item',
                        url  : 'pasencore'
||||||| merged common ancestors
                        'id'   : 'inventory',
                        'title': 'Inventaire',
                        'type' : 'item',
                        'url'  : 'patrimony/inventaire'
=======
                        'id'   : 'inventory',
                        'title': 'Inventaire',
                        'type' : 'item',
                        'url'  : 'patrimony/inventaire'
                    },
                    {
                        'id'   : 'chain',
                        'title': 'Chaine',
                        'type' : 'item',
                        'url'  : 'patrimony/chain/list'
>>>>>>> 32871ae2a2f7ada4ebc4341c770ef881a2e60564
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
            },
            {
                id: 'agencies',
                title: 'Agences',
                translate: 'NAV.AGENCIES.TITLE',
                type: 'item',
                icon: 'domain',
                url: '/admin/agencies',
                authorizations: ['agencies']
            }
        ]
    }
];