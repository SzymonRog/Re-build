import {useEffect, useRef} from "react";
import {updateBuild} from "@/lib/updateBuild";
import {toast} from "sonner";

export function useAutoSaveBuild(id: string | null, componentsIds: string[]) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if(!id) return;
        if(timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(async () => {
            try {
                await updateBuild(id, componentsIds)
                console.log("Auto-save builda zakończony");
            }catch (e){
                console.error(e)
                toast.error("Nie udało się automatycznie zapisać builda");
            }

        }

        , 2000);

        return () => {
            if(timer.current) clearTimeout(timer.current)
        };
    }, [componentsIds,id]);
}