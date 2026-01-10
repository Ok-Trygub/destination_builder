import React from 'react'
import Select, {GroupBase, Props} from 'react-select';
import './style.scss';


type SelectInputProps<
    Option extends {label: string; logo?: string},
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group>;

const SelectInput = <Option extends {
    label: string;
    logo?: string
}, IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectInputProps<Option, IsMulti, Group>) => {

    return (
        <Select
            classNamePrefix="app-selectInput"
            {...props}
            formatOptionLabel={(option) =>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                    {option.logo &&
                        <img src={option.logo} alt="provider_logo"/>
                    }
                    <span>{option.label}</span>
                </div>
            }
        />
    );
}

SelectInput.displayName = 'SelectInput';
export default SelectInput
