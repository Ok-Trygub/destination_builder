import awsIcon from "../assets/img/aws.png";
import googleIcon from "../assets/img/google.png";
import {ISelectInput} from "@helpers/formatSelectOptions";
import {Providers} from "@enums/providers";


export const providers: ISelectInput[] = [
    {
        id: "1",
        name: Providers.AWS,
        logo: awsIcon
    },
    {
        id: "2",
        name: Providers.GOOGLE_CLOUD,
        logo: googleIcon
    }
]
