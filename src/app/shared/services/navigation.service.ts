import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
    hasRole?: String[];
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    hasRole?: string[];
    active?: boolean;
}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    selectedItem: IMenuItem;
    constructor(
        private auth: AuthService
    ) {}
    
    defaultMenu: IMenuItem[] = [
        {
            name: 'Usuários',
            description: 'Informações de usuário.',
            type: 'dropDown',
            icon: 'i-Administrator',
            sub: [
                { icon: 'i-Checked-User', name: 'Meus Dados', state: '/user/data', type: 'link' },
                { icon: 'i-Add-User', name: 'Lista de Usuários', state: '/user/list', type: 'link', hasRole: ["ADMIN"]}
            ]
        },
        {
            name: 'Carteira',
            description: 'Minha Carteira.',
            type: 'dropDown',
            icon: 'i-Wallet',
            sub: [
                { icon: 'i-Money-Bag', name: 'Saldo', state: '/wallet/balance', type: 'link' }
            ]
        },
        {
            name: 'Parceiros',
            description: 'Informações de Parceiros.',
            type: 'dropDown',
            icon: 'i-Shop-2',
            sub: [
                { icon: 'i-Receipt', name: 'Listar Parceiros', state: '/partner', type: 'link' },
                { icon: 'i-Add', name: 'Cadastrar Parceiro', state: '/partner/register', type: 'link', hasRole: ["ADMIN"] }
            ]
        },
        {
            name: 'Administrativo',
            description: 'Configurações do Site.',
            type: 'dropDown',
            icon: 'i-Safe-Box1',
            hasRole: ["ADMIN"],
            sub: [
                { icon: 'i-Money-Bag', name: 'Dashboard ', state: '/admin/balance', type: 'link', hasRole: ["ADMIN"] },
                { icon: 'i-Data', name: 'Ajustar Parametros ', state: '/admin/configuration', type: 'link', hasRole: ["ADMIN"] },
                { icon: 'i-Danger', name: 'Configurações Mestres ', state: '/admin/master/configuration', type: 'link', hasRole: ["MASTER"] },
                { icon: 'i-Unlock-2', name: 'Provedores Integrados ', state: '/admin/master/provider', type: 'link', hasRole: ["MASTER"] }
            ]
        }
    ];

    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    menuItems$ = this.menuItems.asObservable();
}
