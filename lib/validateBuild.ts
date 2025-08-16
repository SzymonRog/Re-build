import {PCComponent} from "@/store/buildStore";
type ValidationError = {
    type: string,
    message: string,
    components?: PCComponent[],
}
export  function validateBuild(components:PCComponent[]): ValidationError[] {
    const errors: ValidationError[] = [];
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
        if (cpu.specs.socket !== motherboard.specs.socket) {
            errors.push({
                type: 'incompatible',
                message: `Procesor (${cpu.name}) i płyta główna (${motherboard.name}) nie są kompatybilne`,
                components: [cpu, motherboard],
            });
        }
    }

    // Sprawdzenie kompatybilności RAM z płytą główną
    if (ram && motherboard) {
        if (ram.specs.type && motherboard.specs.memoryType && !motherboard.specs.memoryType.includes(ram.specs.type)) {
            errors.push({
                type: 'incompatible',
                message: `Pamięć RAM (${ram.name}) nie jest kompatybilna z płytą główną (${motherboard.name})`,
                components: [ram, motherboard],
            });
        }
    }

    // Sprawdzenie kompatybilności chłodzenia CPU z procesorem i obudową
    if (cooler) {
        if (cpu && cooler.specs.compatibleSockets && !cooler.specs.compatibleSockets.includes(cpu.specs.socket)) {
            errors.push({
                type: 'incompatible',
                message: `Chłodzenie CPU (${cooler.name}) nie jest kompatybilne z procesorem (${cpu.name})`,
                components: [cooler, cpu],
            });
        }
        if (pcCase && motherboard) {
            if(!caseCompatiblity[pcCase.specs.formFactor].includes(motherboard.specs.formFactor))
            errors.push({
                type: 'incompatible',
                message: `Płyta główna (${motherboard.name}) nie mieśći sie w obudowie (${pcCase.name})`,
                components: [motherboard, pcCase],
            });
        }
    }

    // Sprawdzenie mocy zasilacza
    if (psu) {
        const totalTDP = components.reduce((sum, c) => sum + (c.specs.tdp ? parseInt(c.specs.tdp) : 0), 0);
        if (psu.specs.wattage && totalTDP * 1.2 > parseInt(psu.specs.wattage)) {
            errors.push({
                type: 'incompatible',
                message: 'Zasilacz nie ma wystarczającej mocy dla wszystkich komponentów',
                components: [psu],
            });
        }
    }

    return errors;
}