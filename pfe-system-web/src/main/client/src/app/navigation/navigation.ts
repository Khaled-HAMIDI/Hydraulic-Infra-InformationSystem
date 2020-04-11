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
                translate: 'NAV.INVENTORY.TITLE',
                type: 'collapsable',
                icon: 'home',
                children:[
                    {
                        'id'   : 'list',
                        'title': 'Liste',
                        'type' : 'item',
                        'url'  : 'patrimony/ouvrages/list'
                    },
                    {
                        'id'   : 'integrate',
                        'title': 'Intégrer',
                        'type' : 'item',
                        'url'  : 'patrimony/ouvrages/add'
                    },
                    {
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