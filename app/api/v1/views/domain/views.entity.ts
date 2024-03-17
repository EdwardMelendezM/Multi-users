export type ViewCreateBody = {
    name: string;
    path: string;
    number: number;
}

export type ViewUpdateBody = {
    name: string;
    number: number;
}

export type StatusResult = {
    status: string;
}

export type IdResult = {
    data: string;
    status: number;
}

export type deleteViewResult = {
    data: string;
    status: string;
}

export type ViewResult = {
    data: View[],
    status: string;
}

export type View = {
    id: string;
    name: string;
    number: number;
    created_at: string;
}