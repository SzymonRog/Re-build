import {toast} from "sonner";

export async function updateBuild(id: string | null, componentsIds: string[]): Promise<boolean> {
    if (!id) {
        toast("By zaktualizować konfigurację najpierw należy być zalogowanym.");
        return false;
    }

    try {
        const response = await fetch(`/api/save/build`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, componentsIds })
        });

        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
            const text = await response.text();
            console.error("Odpowiedź nie jest JSON-em:", text);
            toast.error("Nie udało się zaktualizować builda");
            return false;
        }

        const data = await response.json();
        if (data.success) return true;

        console.error(data.error);
        toast.error("Nie udało się zaktualizować builda");
        return false;
    } catch (e) {
        console.error(e);
        toast.error("Nie udało się zaktualizować builda");
        return false;
    }
}