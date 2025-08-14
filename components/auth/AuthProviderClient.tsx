'use client'
import React, {useEffect, useState} from 'react'
import {User, useUserStore} from "@/store/user";



interface AuthProviderClientProps {
    user: User | null;
}
const AuthProviderClient: React.FC<AuthProviderClientProps> = ({ user }) => {
    const setUser = useUserStore(state => state.setUser)
    const clearUser = useUserStore(state => state.clearUser)
    useEffect(() => {
        if (user) {
            setUser(user);
        } else {
            clearUser();
        }
    }, [user, setUser, clearUser]);

    return null; // nie ren

}
export default AuthProviderClient
