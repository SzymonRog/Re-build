"use client";

import { useEffect, useRef } from "react";
import { useBuildStore } from "@/store/buildStore";
import { useBuildData } from "@/hooks/useBuildData";
import { useRouter } from "next/navigation";
import { updateBuild } from "@/lib/updateBuild";
import { toast } from "sonner";
import {usePreviewBuildStore} from "@/store/previewBuildStore";

export function useAutoSaveBuild(id: string | null, componentsIds: string[], isOwner: boolean) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevComponents = useRef<string[]>([]);
    const hasRedirected = useRef(false);

    const setBuild = useBuildStore(state => state.setBuild);
    const build = useBuildData();
    const router = useRouter();
    const setIsOwner = usePreviewBuildStore(state => state.setIsOwner)



    useEffect(() => {
        // Trigger tylko jeśli coś się zmieniło

        const componentsChanged = prevComponents.current.join(",") !== componentsIds.join(",");

        if (!componentsChanged) return;
        console.log(isOwner);

        const save = async () => {
            if (isOwner) {
                // zapis do API tylko jeśli jesteś ownerem
                if (!id) return;
                try {
                    await updateBuild(id, componentsIds);
                    console.log("Auto-save builda w API zakończony");
                } catch (e) {
                    console.error(e);
                    toast.error("Nie udało się automatycznie zapisać builda");
                }
            } else {
                // zapis lokalny + redirect
                const localBuild = { ...build, buildId: null, isOwner: true };
                setBuild(localBuild);
                setIsOwner(true);

                console.log("Auto-save builda lokalnie zakończony");

                if (!hasRedirected.current) {
                    hasRedirected.current = true;
                    router.push("/konfiguracja/nowa");
                }
            }
        };

        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(save, 300);

        prevComponents.current = componentsIds;

        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [componentsIds, id, isOwner, build, setBuild, router]);
}
