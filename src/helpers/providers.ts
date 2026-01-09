import awsIcon from "../assets/img/aws.png";
import googleIcon from "../assets/img/google.png";


export interface IProvider {
    id: number,
    name: string,
    logo: string
}

export const providers: IProvider[] = [
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
