import React from "react";
import { BASE_PATH } from "../constants/global";

export type ItemTagsProps = {
    tags: {
        name: string;
        slug: string;
    }[];
};

export const ItemTags: React.FC<ItemTagsProps> = ({ tags }) => {
    return (
        <React.Fragment>
            {tags.join(", ")}
        </React.Fragment>
    );
};
export default ItemTags;