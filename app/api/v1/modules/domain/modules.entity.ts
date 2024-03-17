export type ModuleCreateBody = {
    name: string;
    number: number;
}

export type IdResult = {
    data: string;
    status: number;
}

export type Module = {
    id: string;
    name: string;
    number: number;
    created_at: Date;
}

export type moduleResult = {
    data: Module[];
    status: number;
}