import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface User {
    name: string;
    email: string;
    password: string;
    photo?: string | null;   
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
private readonly USER_KEY = 'user_data';
private readonly SESSION_KEY = 'user_session';
private currentUser: User | null = null;

constructor(private storage: StorageService) {
    this.init();
}

async init() {
    const session = await this.storage.get(this.SESSION_KEY);
    if (session) {
        this.currentUser = session;
    }
}

async register(user: User) {
    await this.storage.set(this.USER_KEY, user);
}

async login(email: string, password: string): Promise<boolean> {
    const savedUser: User | null = await this.storage.get(this.USER_KEY);

    if (savedUser) {
        if (savedUser.email === email && savedUser.password === password) {
        this.currentUser = savedUser;

        
        await this.storage.set(this.SESSION_KEY, savedUser);

        return true;
    }
        return false;
    }

    
    if (email && password) {
        const mockUser: User = { 
        name: 'Usuario', 
        email, 
        password,
        photo: null        
    };

        this.currentUser = mockUser;

        await this.storage.set(this.SESSION_KEY, mockUser);

        return true;
    }

    return false;
}

async isLoggedIn(): Promise<boolean> {
    const session = await this.storage.get(this.SESSION_KEY);
    return !!session;
}

async getUser(): Promise<User | null> {
    return await this.storage.get(this.SESSION_KEY);
}

async updateUser(changes: Partial<User>) {
    const user = await this.getUser();
    if (!user) return;

    const updatedUser: User = {
        ...user,
        ...changes
    };

    this.currentUser = updatedUser;

    await this.storage.set(this.USER_KEY, updatedUser);
    await this.storage.set(this.SESSION_KEY, updatedUser);
}

async logout() {
    await this.storage.remove(this.SESSION_KEY);
    this.currentUser = null;
    return true;
}
}
