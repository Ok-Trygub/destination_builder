export interface IDestination {
    url: string,
    key: string,
    secret: string
}

export interface IDestinationPayload {
    destination: IDestination
}

export interface IBackendError {
    field: string;
    message: string;
}

export const saveProviderDestination = async (payload: IDestinationPayload): Promise<IDestinationPayload> => {
    await new Promise((r) => setTimeout(r, 2000));

    if (/\d/.test(payload.destination.key)) {
        throw {field: "accessKeyId", message: "Access Key ID must not contain digits."};
    }

    return payload;
};
