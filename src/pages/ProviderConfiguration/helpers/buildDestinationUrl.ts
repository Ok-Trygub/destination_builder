import {Providers} from "@enums/providers";
import {ServerProtocols} from "@enums/serverProtocols";
import {SingleValue} from "react-select";
import {ISelectOption} from "@helpers/formatSelectOptions";

const FIXED_PATH = "folder";

export const buildDestinationUrl = (
    provider: string,
    region: SingleValue<ISelectOption> | null,
    bucket: string,
): string | undefined => {

    if (provider === Providers.AWS && region) {
        return `${ServerProtocols.AWS}s3.${region.value}.amazonaws.com/${bucket.trim()}/${FIXED_PATH}`;
    } else if (provider === Providers.GOOGLE_CLOUD) {
        return `${ServerProtocols.GOOGLE_CLOUD}storage.googleapis.com/${bucket.trim()}/${FIXED_PATH}`;
    } else {
        return
    }
};
