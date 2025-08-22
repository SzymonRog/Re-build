import {useBuildStore} from "@/store/buildStore";
import {usePreviewBuildStore} from "@/store/previewBuildStore";

export const useBuildData = () => {
    const isOwner = usePreviewBuildStore(state => state.isOwner);
    const buildData = useBuildStore(state => state);
    const previewData = usePreviewBuildStore(state => state);

    return isOwner ? buildData : previewData;
};

