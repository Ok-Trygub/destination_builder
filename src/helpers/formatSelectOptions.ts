export interface ISelectInput {
    id: string,
    name: string,
    logo?: string
}

export interface ISelectOption {
    value: string,
    label: string,
    logo?: string
}

export const formatSelectOptions = (selectData: ISelectInput[]): ISelectOption[] => {
    return selectData.map(opt => {
        return {
            value: opt.id,
            label: opt.name,
            logo: opt.logo
        }
    })
}
