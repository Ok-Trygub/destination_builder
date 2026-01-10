import awsIcon from "../assets/img/aws.png";
import googleIcon from "../assets/img/google.png";
import {ISelectInput} from "@helpers/formatSelectOptions";


export const providers: ISelectInput[] = [
    {
        id: 1,
        name: "AWS",
        logo: awsIcon
    },
    {
        id: 2,
        name: "Google Cloud",
        logo: googleIcon
    }
]
