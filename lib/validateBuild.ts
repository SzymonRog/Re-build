import {PCComponent} from "@/store/buildStore";
type ValidationError = {
    type: string,
    message: string,
    components?: PCComponent[],
}
export  function validateBuild(components:PCComponent[]): ValidationError[] {
    const errors: ValidationError[] = [];

    const validComponents = components.filter(c => c && c.type);

    if (validComponents.length !== components.length) {
        console.warn('Filtered out invalid components:',
            components.filter(c => !c || !c.type)
        );
    }
    const cpu = components.find(c => c.type === 'cpu');
    const motherboard = components.find(c => c.type === 'motherboard');
    const ram = components.find(c => c.type === 'ram');
    const cooler = components.find(c => c.type === 'cpuCooler');
    const psu = components.find(c => c.type === 'psu');
    const gpu = components.find(c => c.type === 'gpu');
    const pcCase = components.find(c => c.type === 'case');



    const caseCompatiblity: Record<string, string[]> = {
        'eATX': ['ATX', 'mATX', 'ITX','eATX'],
        'ATX': ['ATX', 'mATX', 'ITX'],
        'mATX': ['mATX', 'ITX']
    }


    if (!cpu) {
        errors.push({
            type: 'missing_component',
            message: 'Brak procesora w konfiguracji',
        });
    }

    if (!motherboard) {
        errors.push({
            type: 'missing_component',
            message: 'Brak płyty głównej w konfiguracji',
        });
    }

    if (!ram) {
        errors.push({
            type: 'missing_component',
            message: 'Brak pamięci RAM w konfiguracji',
        });
    }

    if (cpu && motherboard) {
        const cpuSocket = (cpu.specs as { socket?: string })?.socket;
        const mbSocket = (motherboard.specs as { socket?: string })?.socket;

        if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
            errors.push({
                type: 'incompatible',
                message: `Procesor (${cpu.name}) i płyta główna (${motherboard.name}) nie są kompatybilne`,
                components: [cpu, motherboard],
            });
        }
    }

// Sprawdzenie kompatybilności RAM z płytą główną
    if (ram && motherboard) {
        const ramType = (ram.specs as { type?: string })?.type;
        const mbMemType = (motherboard.specs as { memoryType?: string[] })?.memoryType;

        if (ramType && mbMemType && !mbMemType.includes(ramType)) {
            errors.push({
                type: 'incompatible',
                message: `Pamięć RAM (${ram.name}) nie jest kompatybilna z płytą główną (${motherboard.name})`,
                components: [ram, motherboard],
            });
        }
    }

// Sprawdzenie kompatybilności chłodzenia CPU z procesorem i obudową
    if (cooler) {
        const coolerSockets = (cooler.specs as { compatibleSockets?: string[] })?.compatibleSockets;
        const cpuSocket = (cpu?.specs as { socket?: string })?.socket;

        if (cpu && coolerSockets && cpuSocket && !coolerSockets.includes(cpuSocket)) {
            errors.push({
                type: 'incompatible',
                message: `Chłodzenie CPU (${cooler.name}) nie jest kompatybilne z procesorem (${cpu.name})`,
                components: [cooler, cpu],
            });
        }

        if (pcCase && motherboard) {
            const caseFormFactor = (pcCase.specs as { formFactor?: string })?.formFactor;
            const mbFormFactor = (motherboard.specs as { formFactor?: string })?.formFactor;

            if (
                caseFormFactor &&
                mbFormFactor &&
                !(caseCompatiblity[caseFormFactor] || []).includes(mbFormFactor)
            ) {
                errors.push({
                    type: 'incompatible',
                    message: `Płyta główna (${motherboard.name}) nie mieści się w obudowie (${pcCase.name})`,
                    components: [motherboard, pcCase],
                });
            }
        }
    }

// Sprawdzenie mocy zasilacza
    if (psu) {
        const psuWattage = parseInt((psu.specs as { wattage?: string })?.wattage || "0");

        const totalTDP = components.reduce((sum, c) => {
            const tdp = parseInt((c.specs as { tdp?: string })?.tdp || "0");
            return sum + tdp;
        }, 0);

        if (psuWattage && totalTDP * 1.2 > psuWattage) {
            errors.push({
                type: 'incompatible',
                message: 'Zasilacz nie ma wystarczającej mocy dla wszystkich komponentów',
                components: [psu],
            });
        }
    }

    return errors;
}