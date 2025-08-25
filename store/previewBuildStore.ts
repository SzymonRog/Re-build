import { create } from "zustand";
import {PCComponent, ValidationError} from "@/store/buildStore";
import {validateBuild} from "@/lib/validateBuild";
import {useBuildStore} from "@/store/buildStore";
import {redirect} from "next/navigation";


export type PreviewBuildState = {
    buildId: string | null;
    name: string;
    components: PCComponent[];
    totalPrice: number;
    errors: ValidationError[];
    isOwner: boolean;

    // akcje
    setBuild: (build: {
        buildId: string | null;
        name: string;
        components: PCComponent[];
        totalPrice: number;
        errors?: ValidationError[];
        isOwner: boolean;
    }) => void;

    validateBuild: () => void
    addComponent: (component: PCComponent) => void;
    removeComponent: (componentId: string) => void;
    clearBuild: () => void;
    syncBuild: () => void;
    setIsOwner: (isOwner: boolean) => void;

};

export const usePreviewBuildStore = create<PreviewBuildState>((set, get) => ({
    buildId: null,
    name: "",
    components: [],
    totalPrice: 0,
    errors: [],
    isOwner: false,

    setBuild: ({ buildId, name, components, totalPrice, errors = [] }) => {
        set({
        buildId,
        name,
        components,
        totalPrice,
        errors,
        })
        get().validateBuild();
    },



    setName: (name: string) => {
        set({ name })
        get().syncBuild()
    },
    addComponent: (newComponent) => {
        const currentComponents = get().components;
        const updated = [
            ...currentComponents.filter((c) => c.type !== newComponent.type),
            newComponent,
        ];
        set({ components: updated }, false);
        get().validateBuild();
        get().syncBuild()
    },
    removeComponent: (componentId) => {
        const currentComponents = get().components;
        const updated = currentComponents.filter((c) => c.id !== componentId);
        set({ components: updated }, false);
        get().validateBuild();
        get().syncBuild()
    },
    clearBuild: () => {
        set({
            components: [],
            totalPrice: 0,
        })
        get().validateBuild();
    },
    calculateTotal: () => {
        const currentComponents = get().components;
        const total = currentComponents.reduce((acc, c) => acc + c.price, 0);
        set({ totalPrice: total }, false);
    },
    validateBuild: () => {
        const errors = validateBuild(get().components);
        set({ errors });

    },
    syncBuild: () => {
        const build = get();
        if (!build.isOwner) {
            const localBuild = { ...build, buildId: null, isOwner: true };
            useBuildStore.getState().setBuild(localBuild);
        }
    },

    setIsOwner: (isOwner:boolean) => {
        set({isOwner})
    }

}));